import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import datumLogo from "@assets/Screenshot_2025-04-01_201751-removebg-preview.png";
import glaLogo from "@assets/GLA_University_logo.png";

export default function Hero() {
  return (
    <section className="pt-20 md:pt-26 pb-16 md:pb-24 bg-[#2B2D42] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
        </div>
      </div>
      
      <div className="container mx-auto px-12 relative z-10">
        {/* Organizers banner */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full inline-flex items-center">
            <span className="text-sm mr-2">Organized by:</span>
            <img src={datumLogo} alt="Datum Club Logo" className="h-6 mr-2" />
            <span className="font-medium mr-2">DATUM CLUB</span>
            <span className="text-sm mr-2">at</span>
            <img src={glaLogo} alt="GLA University Logo" className="h-6" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-[#30BFDD]">HACK</span> AND <span className="text-[#30BFDD]">VIZ</span> 2.0
            </h1>
            <p className="text-xl md:text-2xl font-light mb-6">
              A 30-hour hackathon & Data Visualization competition
            </p>
            <p className="text-lg md:text-xl mb-8">
              Join us for an unforgettable experience of coding, collaboration, and creativity at GLA University.
            </p>
            
            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">Event Starts In</h3>
              <CountdownTimer targetDate="April 19, 2025 09:00:00" />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild className="bg-[#30BFDD] hover:bg-[#1E90BC] px-8 py-6 h-auto rounded-full font-semibold text-base">
                <Link href="/register">Register Now</Link>
              </Button>
              <Button asChild className="bg-white text-[#2B2D42] hover:bg-gray-100 px-8 py-6 h-auto rounded-full font-semibold text-base">
                <Link href="#about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Hackathon participants collaborating" 
              className="rounded-lg shadow-2xl max-w-full md:max-w-lg"
            />
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 100H1440V0C1440 0 1320 60 1200 60C1080 60 1020 0 900 0C780 0 720 60 600 60C480 60 420 0 300 0C180 0 120 60 0 60V100Z" fill="#EDF2F4"/>
        </svg>
      </div>
    </section>
  );
}
