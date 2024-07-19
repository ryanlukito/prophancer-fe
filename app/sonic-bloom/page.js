"use client";

import React, { useEffect, useState } from "react";
import NavBar2 from "../components/NavBar2";
import Image from "next/image";
import mqtt from "mqtt";
import axios from "axios";

const ScheduleBox = ({ id, time, onDelete, timeleft }) => {
  return (
    <div className="flex flex-row mr-2">
      <div className="px-5 py-2 rounded-lg bg-white w-full flex flex-row justify-between items-center cursor-pointer m-1">
        <div>
          <p className="font-bold text-[25px]">{time}</p>
          <p className="text-[10px]">
            <span className="font-bold">{timeleft}</span> sebelum Sonic Bloom
            dinyalakan
          </p>
        </div>

        <button onClick={() => onDelete(id)}>
          <Image
            src="/assets/trashCan.png"
            width={70}
            height={70}
            alt="image"
          />
        </button>
      </div>
    </div>
  );
};

const SonicBloom = () => {
  const [dataSchedule, setDataSchedule] = useState([]);
  const [time, setTime] = useState("");
  const [type, setType] = useState("sonic-bloom");
  const [client, setClient] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [error, setError] = useState(null);
  const [dummystate, setDummystate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5050/get_schedule");
        setDataSchedule(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [dummystate, setDummystate]);

  const scheduleHandler = (theName, theTime) => {
    const timeData = {
      propcode: String(Date.now()),
      propname: theName,
      proptime: theTime,
      propvalue: 1,
    };
    setDataSchedule((prevDataSchedule) => [...prevDataSchedule, timeData]);
  };

  const postData = async () => {
    try {
      await axios.post("http://localhost:5050/post_schedule", {
        name: type,
        time: time,
        code: Date.now(),
        value: 1,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/delete_schedule/${id}`
      );
      console.log("Response data:", response.data);
      console.log("ID to delete:", id);
    } catch (error) {
      console.log(error.message);
    }
    setDummystate(dummystate+1);
  };

  // mqtt config
  useEffect(() => {
    const brokerUrl = "ws://broker.emqx.io:8083/mqtt";
    const options = {
      clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
      keepAlive: 60,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    };

    const newClient = mqtt.connect(brokerUrl, options);
    setClient(newClient);

    newClient.on("connect", () => {
      newClient.subscribe("tes-prophancer-sub/1", (err) => {
        if (err) {
          console.log(err);
        }
        console.log("you have been subscribed to tes-prophancer-sub/1");
      });
    });
  }, []);

  // publish message to mqtt server
  useEffect(() => {
    const checkTime = () => {
      const current = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(current);
      setDataSchedule((prevDataSchedule) =>
        prevDataSchedule.map((schedule) => {
          if (schedule.proptime === current && !schedule.logged) {
            if (client) {
              client.publish("tes-prophancer-sub/1", JSON.stringify(schedule));
            }
            console.log("sonic-bloom");
            console.log(schedule);
            return { ...schedule, logged: true }; // Set logged to true after logging
          }
          return schedule;
        })
      );
    };

    const intervalId = setInterval(checkTime, 1000); // Check every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dataSchedule, client]);

  const calculateTimeLeft = (scheduleTime) => {
    if (!scheduleTime) {
      return "Invalid time";
    }

    const current = new Date();
    const [scheduleHour, scheduleMinute] = scheduleTime.split(":").map(Number);

    if (isNaN(scheduleHour) || isNaN(scheduleMinute)) {
      return "Invalid time";
    }

    const schedule = new Date(current);
    schedule.setHours(scheduleHour, scheduleMinute, 0, 0);

    const diff = schedule - current;
    const hoursLeft = Math.floor(diff / 3600000);
    const minutesLeft = Math.ceil((diff % 3600000) / 60000); // Convert milliseconds to minutes
    const secondsLeft = Math.floor((diff % 60000) / 1000); // Convert remaining milliseconds to seconds
    const remainingTime =
      minutesLeft > 0 || secondsLeft > 0
        ? `${hoursLeft} jam ${minutesLeft} menit`
        : `${hoursLeft + 24} jam ${minutesLeft + 60} menit`;
    return remainingTime; // Return formatted time left or 'Time passed'
  };

  return (
    <div className="w-screen h-[100vh] flex flex-col">
      <div>
        <NavBar2 title="SONIC BLOOM"/>
      </div>
      <div className="flex flex-grow justify-center items-center h-[100vh] px-10">
        <div className="">
          <div className="flex items-center pl-5">
            <h2 className="font-bold">SELECT TIME</h2>
          </div>
          <div className="flex justify-start pl-5">
            <input
              type="time"
              className="bg-white w-[200px] h-[40px] drop-shadow-lg rounded-lg px-3 hover:bg-slate-100"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
            <div className="bg-green-500 ml-3 px-2 rounded-md hover:bg-green-600">
              <button
                className="mt-2 text-white font-bold"
                onClick={() => {
                  scheduleHandler(type, time);
                  postData();
                }}
              >
                SET
              </button>
            </div>
          </div>
          <div className="p-4 w-[400px] h-[400px] bg-green-500 my-2 opacity-60 rounded-md">
            <div className="overflow-auto h-full">
              {dataSchedule.length > 0 &&
                dataSchedule.map((data, index) => (
                  // console.log(data);
                    <ScheduleBox
                      key={index}
                      id={data.propcode}
                      time={data.proptime}
                      timeleft={calculateTimeLeft(data.proptime)}
                      onDelete={handleDelete}
                    />
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SonicBloom;