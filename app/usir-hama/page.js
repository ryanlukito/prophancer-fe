"use client";

import React, { useState, useEffect } from "react";
import NavBar2 from "../components/NavBar2";
import BoxTikus from "../components/BoxTikus";
import BoxBurung from "../components/BoxBurung";

import mqtt from "mqtt";

const UsirHama = () => {
  const [client, setClient] = useState(null);

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
        console.log("you have been subscribe to tes-prophancer-sub/1");
      });
    });
  }, []);

  const burungHandler = (message) => {
    if (client) {
      client.publish("tes-prophancer-sub/1", JSON.stringify(message));
    }
    console.log("hallo burung");
  };

  const tikusHandler = (message) => {
    if (client) {
      client.publish("tes-prophancer-sub/1", JSON.stringify(message));
    }
    console.log("hallo tikus");
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div>
        <NavBar2 children="USIR HAMA" />
      </div>
      <div className="flex justify-center items-center flex-grow md:h-[80vh]">
        <BoxTikus
          children="Usir Tikus"
          handler={() =>
            tikusHandler({
              id: Date.now(),
              propname: "usir-tikus",
              proptime: "09:00",
              propvalue: 1,
            })
          }
        />
        <BoxBurung
          children="Usir Burung"
          handler={() =>
            burungHandler({
              id: Date.now(),
              propname: "usir-burung",
              proptime: "09:00",
              propvalue: 1,
            })
          }
        />
      </div>
    </div>
  );
};

export default UsirHama;
