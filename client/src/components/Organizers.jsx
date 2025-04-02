import React from "react";
import glaLogo from "@assets/GLA_University_logo.png";
import datumLogo from "@assets/Screenshot_2025-04-01_201751-removebg-preview.png";

export default function Organizers() {
  return (
    <section id="organizers" className="py-16 md:py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Organizers</h2>
          <div className="w-24 h-1 bg-[#30BFDD] mx-auto"></div>
          <p className="mt-6 text-lg max-w-3xl mx-auto">
            Hack and Viz 2.0 is proudly organized by the Datum Club in collaboration with GLA University.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-4 h-64 w-64 flex items-center justify-center">
              <img 
                src={glaLogo} 
                alt="GLA University Logo" 
                className="max-h-52 max-w-52"
              />
            </div>
            <h3 className="text-xl font-semibold">GLA University</h3>
            <p className="text-gray-600">Host Institution</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-4 h-64 w-64 flex items-center justify-center">
              <img 
                src={datumLogo} 
                alt="Datum Club Logo" 
                className="max-h-52 max-w-52"
              />
            </div>
            <h3 className="text-xl font-semibold">Datum Club</h3>
            <p className="text-gray-600">Organizing Club</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium mb-4">Want to be a part of Hack and Viz 2.0?</p>
          <a 
            href="#register" 
            className="inline-block bg-[#2B2D42] hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}