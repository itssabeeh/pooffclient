import React, { useState, useEffect } from 'react';
import '../Timer/Timer.css';
const Timer = ({ expireAt }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let interval;
  const timer = () => {
    const targetDate = new Date(expireAt);
    const targetTime = targetDate.getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetTime - now;
      const day = Math.floor(diff / (24 * 60 * 60 * 1000));
      const hour = Math.floor(
        (diff % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minute = Math.floor((diff % (60 * 60 * 1000)) / (1000 * 60));
      const second = Math.floor((diff % (60 * 1000)) / 1000);
      if (diff < 0) {
        clearInterval(interval.current);
      } else {
        setDays(day);
        setHours(hour);
        setMinutes(minute);
        setSeconds(second);
      }
    }, 1000);
  };

  useEffect(() => {
    expireAt && timer();
  });

  return (
    <div className="timer-container">
      <p>Your message is going to disaapear in</p>
      <span>{days} day's </span>
      <span>{hours} Hour </span>
      <span>{minutes} minutes and </span>
      <span>{seconds} seconds</span>
    </div>
  );
};

export default Timer;
