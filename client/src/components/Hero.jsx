import React from "react";
import CountdownTimer from "./CountdownTimer";
import datumLogo from "@assets/Screenshot_2025-04-01_201751-removebg-preview.png";
import glaLogo from "@assets/GLA_University_logo.png";

export default function Hero() {
  return (
    <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-[#2B2D42] text-white relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30"></div>

        {/* Animated code lines - visible on tablet and up */}
        <div className="hidden sm:block absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-blue-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                opacity: Math.random() * 0.5 + 0.25,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Organizers banner - responsive sizing and wrapping */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="bg-white/10 backdrop-blur-sm py-2 px-3 sm:px-4 rounded-full inline-flex items-center flex-wrap justify-center gap-2">
            <span className="text-xs sm:text-sm">Organized by:</span>
            <img src={datumLogo} alt="Datum Club Logo" className="h-5 sm:h-6" />
            <span className="font-medium text-sm sm:text-base">DATUM CLUB</span>
            <span className="text-xs sm:text-sm">at</span>
            <img
              src={glaLogo}
              alt="GLA University Logo"
              className="h-5 sm:h-6"
            />
          </div>
        </div>

        {/* Event status banner - responsive sizing */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 py-2 sm:py-3 px-6 sm:px-8 rounded-full animate-pulse shadow-lg">
            <span className="font-bold text-base sm:text-lg">
              EVENT IN PROGRESS
            </span>
          </div>
        </div>

        {/* Main content - responsive layout */}
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-6">
            {/* Main heading - responsive sizing */}
            <div className="relative mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-[#30BFDD] relative">
                  HACK
                  <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 sm:w-4 h-3 sm:h-4 bg-red-500 rounded-full animate-ping opacity-75"></span>
                </span>{" "}
                AND <span className="text-[#30BFDD]">VIZ</span> 2.0
              </h1>
              <div className="absolute -bottom-2 sm:-bottom-3 left-0 h-1 w-16 sm:w-24 bg-gradient-to-r from-[#30BFDD] to-transparent"></div>
            </div>

            {/* Subtitle - responsive sizing */}
            <p className="text-lg sm:text-xl md:text-2xl font-light mb-6 sm:mb-8">
              A 24-hour hackathon & Data Visualization competition
            </p>

            {/* Welcome card - responsive sizing and hover */}
            <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-sm border border-white/20 mb-6 sm:mb-8 transform transition-all hover:scale-105">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Welcome, Innovators!
              </h3>
              <p className="text-base sm:text-lg mb-2">
                The competition is now live! The room is buzzing with creativity
                and code.
              </p>
              <p className="text-base sm:text-lg">
                Good luck to all teams as you build your amazing projects!
              </p>
            </div>

            {/* Countdown Timer - responsive sizing */}
            <div className="bg-black/30 backdrop-blur-sm p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg mb-6 sm:mb-8">
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Event Countdown
                </h3>
              </div>
              <CountdownTimer targetDate="April 20, 2025 16:30:00" />
              <p className="text-xs sm:text-sm mt-2 sm:mt-3 text-gray-300 italic">
                Stay focused! Make every second count.
              </p>
            </div>
          </div>

          {/* Image section - responsive sizing and positioning */}
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 flex justify-center">
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-105 group w-full max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Hackathon participants collaborating"
                className="w-full h-auto rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-0 left-0 bg-gradient-to-r from-green-500 to-blue-500 text-white py-1 sm:py-2 px-3 sm:px-4 rounded-br-lg font-bold flex items-center">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full mr-1.5 sm:mr-2 animate-ping"></span>
                <span className="text-sm sm:text-base">LIVE NOW</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                <p className="text-white font-medium text-sm sm:text-base">
                  Innovation in progress at GLA University
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider - responsive height */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 lg:h-24">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100H1440V0C1440 0 1320 60 1200 60C1080 60 1020 0 900 0C780 0 720 60 600 60C480 60 420 0 300 0C180 0 120 60 0 60V100Z"
            fill="#EDF2F4"
          />
        </svg>
      </div>
    </section>
  );
}
