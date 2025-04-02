import React, { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate = "April 19, 2025 09:00:00" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const countdownDate = new Date(targetDate).getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      
      if (distance < 0) {
        // Target date has passed
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    // Update immediately and then set interval
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  // Helper function to format numbers (add leading zero)
  const formatNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="flex justify-between">
      <div className="countdown-item text-center px-2 relative">
        <div className="text-3xl md:text-4xl font-bold text-[#30BFDD]">
          {formatNumber(timeLeft.days)}
        </div>
        <div className="text-sm uppercase">Days</div>
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 text-2xl hidden md:block">:</div>
      </div>
      <div className="countdown-item text-center px-2 relative">
        <div className="text-3xl md:text-4xl font-bold text-[#30BFDD]">
          {formatNumber(timeLeft.hours)}
        </div>
        <div className="text-sm uppercase">Hours</div>
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 text-2xl hidden md:block">:</div>
      </div>
      <div className="countdown-item text-center px-2 relative">
        <div className="text-3xl md:text-4xl font-bold text-[#30BFDD]">
          {formatNumber(timeLeft.minutes)}
        </div>
        <div className="text-sm uppercase">Minutes</div>
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 text-2xl hidden md:block">:</div>
      </div>
      <div className="countdown-item text-center px-2">
        <div className="text-3xl md:text-4xl font-bold text-[#30BFDD]">
          {formatNumber(timeLeft.seconds)}
        </div>
        <div className="text-sm uppercase">Seconds</div>
      </div>
    </div>
  );
}