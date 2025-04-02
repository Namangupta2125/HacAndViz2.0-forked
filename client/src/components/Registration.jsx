import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Registration() {
  return (
    <section id="register" className="py-16 md:py-24 bg-[#2B2D42] text-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Register Now</h2>
          <p className="text-lg max-w-2xl mx-auto">Secure your spot at Hack and Viz 2.0 and be part of an amazing tech experience!</p>
          <div className="w-24 h-1 bg-[#30BFDD] mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Why Participate?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#30BFDD] mt-1 mr-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                <div>
                  <h4 className="font-medium mb-1">Learn & Build</h4>
                  <p className="text-sm text-gray-300">Gain hands-on experience building real projects in just 30 hours</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#30BFDD] mt-1 mr-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <div>
                  <h4 className="font-medium mb-1">Network</h4>
                  <p className="text-sm text-gray-300">Connect with fellow tech enthusiasts, mentors, and industry professionals</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#30BFDD] mt-1 mr-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium mb-1">Win Prizes</h4>
                  <p className="text-sm text-gray-300">Compete for cash prizes, internship opportunities, and more</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#30BFDD] mt-1 mr-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium mb-1">Get Recognized</h4>
                  <p className="text-sm text-gray-300">Add valuable experience to your resume and portfolio</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#30BFDD] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Registration Deadline
              </h4>
              <p className="text-sm">April 10, 2025 at 11:59 PM</p>
              <p className="text-xs mt-2">Limited spots available - register early!</p>
            </div>
          </div>
          
          {/* Registration CTA */}
          <div className="bg-white text-[#2B2D42] p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold mb-6">Ready to Join Us?</h3>
            
            <p className="mb-8 text-gray-700">
              Click below to complete the registration form and secure your spot at Hack and Viz 2.0. 
              Registration takes just a few minutes, and our team will contact you with all the details.
            </p>
            
            <div className="space-y-4 w-full">
              <Button asChild className="bg-[#30BFDD] hover:bg-red-700 text-white font-semibold py-6 h-auto rounded-lg w-full text-lg">
                <Link href="/register">
                  Complete Registration Form
                </Link>
              </Button>
              
              <p className="text-sm text-gray-600">
                By registering, you agree to our event's code of conduct and terms & conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}