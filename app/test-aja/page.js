"use client";
import React, { useState, useEffect } from "react";

const testAja = () => {
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:10");
  const [isRunning, setIsRunning] = useState(false);

  const getCurrentTimeString = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  useEffect(() => {
    console.log(getCurrentTimeString());
  }, []);

  return <div>testAja</div>;
};

export default testAja;
