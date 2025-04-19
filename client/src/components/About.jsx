import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import img1 from "../../../attached_assets/img1.jpg";
import img2 from "../../../attached_assets/img2.jpg";
import img3 from "../../../attached_assets/img3.jpg";
import img4 from "../../../attached_assets/img4.jpg";
import img5 from "../../../attached_assets/img5.jpg";
import img6 from "../../../attached_assets/img6.jpg";

export default function About() {
  const [activeImage, setActiveImage] = useState(0);

  // Replace with proper image paths or use placeholder images
  const images = [
    img5, 
    img6,
  ];

  const handleNavigation = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About The Event
          </h2>
          <div className="w-24 h-1 bg-[#30BFDD] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              What is <span className="text-[#30BFDD]">Hack and Viz 2.0</span>?
            </h3>
            <p className="text-lg mb-6">
              Hack and Viz 2.0 is a 24-hour hackathon organized by the Datum
              Club of GLA University. It brings together student developers,
              designers, and innovators to collaborate on projects addressing
              real-world challenges.
            </p>
            <p className="text-lg mb-6">
              Building on the success of our first event, Hack and Viz 2.0
              offers more categories, bigger prizes, and enhanced opportunities
              for networking with industry professionals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#30BFDD] mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg font-medium">April 19-20, 2025</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#30BFDD] mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg font-medium">
                  GLA University Campus
                </span>
              </div>
            </div>
            <Button
              className="bg-[#2B2D42] hover:bg-opacity-90 text-white px-8 py-3 h-auto rounded-full font-semibold"
              onClick={() => handleNavigation("hackathon-details")}
            >
              View Hackathon Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
          <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-black bg-opacity-10 z-10 rounded-lg"></div>
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeImage === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image}
                  alt={`Hackathon image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeImage === index ? "bg-white" : "bg-gray-400"
                  }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 z-20"
              onClick={() =>
                setActiveImage(
                  (activeImage - 1 + images.length) % images.length
                )
              }
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 z-20"
              onClick={() => setActiveImage((activeImage + 1) % images.length)}
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Hackathon Details Section */}
        <div id="hackathon-details" className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hackathon Details
            </h2>
            <div className="w-24 h-1 bg-[#30BFDD] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
              <div className="flex items-center mb-6">
                <span className="bg-[#30BFDD] text-white text-sm font-medium px-3 py-1 rounded-full">
                  Main Event
                </span>
                <span className="ml-auto text-sm font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-[#30BFDD]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  24 Hours
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                30-Hour Hackathon Challenge
              </h3>
              <p className="text-lg mb-6">
                Our flagship competition where teams of 3-4 participants work on
                innovative solutions to real-world problems. Develop your
                project from concept to prototype in just 24 hours!
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#30BFDD] mt-1 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium">Prize Pool: ₹18,000</h4>
                    <p className="text-gray-600">
                      Including cash prizes, internship opportunities, and
                      sponsored goodies
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#30BFDD] mt-1 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <div>
                    <h4 className="font-medium">Team Size: 3-4 members</h4>
                    <p className="text-gray-600">
                      Cross-discipline teams encouraged
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#30BFDD] mt-1 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium">Resources Provided</h4>
                    <p className="text-gray-600">
                      Workspace, high-speed internet, meals, beverages, and
                      mentorship
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="text-xl font-semibold mb-4">Competition Format</h4>
              <div className="space-y-6 mb-8">
                <div className="flex">
                  <div className="bg-[#30BFDD] text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-medium text-lg">
                      Round 1: Initial Assessment
                    </h5>
                    <p className="text-gray-600">
                      <span className="font-medium">Timing: 3:00 PM to 6:30 PM (April 19)</span><br />
                      Teams will be evaluated on reason of theme selection, problem statement chosen, relevance to theme, and their tentative solution approach.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-[#30BFDD] text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-medium text-lg">
                      Round 2: evaluation criteria
                    </h5>
                    <p className="text-gray-600">
                      <span className="font-medium">Timing: 2:30 AM to 6:30 AM (April 20)</span><br />
                      Technical approach, creative problem-solving, solution optimization, and relevance to the theme will be assessed.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-[#30BFDD] text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-medium text-lg">
                      Round 3: Dashboard Presentation
                    </h5>
                    <p className="text-gray-600">
                      <span className="font-medium">Timing: 11:00 AM to 4:00 PM (April 20)</span><br />
                      The final evaluation will be based solely on teams' data visualization dashboard presentations, showcasing insights from their project data.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-[#2B2D42] hover:bg-opacity-90 text-white text-center px-6 py-3 h-auto rounded-lg font-medium w-full md:w-auto md:px-12">
                Register Now
              </Button>
            </div>

            {/* Interactive Images Section */}
            <div className="space-y-6">
              <div className="relative h-64 overflow-hidden rounded-lg shadow-md group">
                <img
                  src={img1}
                  alt="Hackathon workspace"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <p className="text-white p-4 font-medium">
                    Collaborative workspace setup for 24-hour coding
                  </p>
                </div>
              </div>

              <div className="relative h-64 overflow-hidden rounded-lg shadow-md group">
                <img
                  src={img2}
                  alt="Data visualization dashboard"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <p className="text-white p-4 font-medium">
                    Sample Power BI dashboard visualization
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 overflow-hidden rounded-lg shadow-md group">
                  <img
                    src={img3}
                    alt="Team collaboration"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <p className="text-white p-3 text-sm font-medium">
                      Team brainstorming session
                    </p>
                  </div>
                </div>

                <div className="relative h-48 overflow-hidden rounded-lg shadow-md group">
                  <img
                    src={img4}
                    alt="Project presentation"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <p className="text-white p-3 text-sm font-medium">
                      Finalist team presentation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
