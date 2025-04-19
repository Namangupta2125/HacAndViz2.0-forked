import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RoundDetails() {
  const [activeRound, setActiveRound] = useState(1);

  const rounds = [
    {
      id: 1,
      title: "Round 1: Ideation Phase",
      timing: "3:00 PM - 6:30 PM (19 April)",
      description: "Present your initial ideas and problem statements aligned with the hackathon theme.",
      criteria: [
        { title: "Theme Selection", description: "Reasoning and justification for the chosen theme" },
        { title: "Problem Statement", description: "Clarity and definition of the problem being addressed" },
        { title: "Theme Relevance", description: "How well the solution aligns with the hackathon theme" },
        { title: "Tentative Solution", description: "Preliminary approach and solution framework" }
      ],
      color: "#30BFDD"
    },
    {
      id: 2,
      title: "Round 2: Development Phase",
      timing: "2:30 AM - 6:30 AM (20 April)",
      description: "Focus on implementing your solution with creative and technical excellence.",
      criteria: [
        { title: "Technical Stack", description: "Appropriateness and mastery of selected technologies" },
        { title: "Innovation", description: "Uniqueness and creativity of the proposed solution" },
        { title: "Implementation", description: "Quality of code and technical execution" },
      ],
      color: "#2B2D42"
    },
    {
      id: 3,
      title: "Round 3: Dashboard Presentation",
      timing: "11:00 AM - 4:00 PM (20 April)",
      description: "Create and present data visualization dashboards that showcase your project insights.",
      criteria: [
        { title: "Data Visualization", description: "Clarity and effectiveness of data representation" },
        { title: "User Interface", description: "Dashboard design, layout, and user experience" },
        { title: "Insights", description: "Value and depth of insights derived from the data" },
        { title: "Presentation", description: "Delivery and explanation of dashboard functionalities" }
      ],
      color: "#30BFDD"
    }
  ];

  return (
    <section id="round-details" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Competition Rounds
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our hackathon is divided into three intensive rounds that will test your ideation, 
            development, and presentation skills throughout the 24-hour challenge.
          </p>
          <div className="w-24 h-1 bg-[#30BFDD] mx-auto mt-6"></div>
        </div>

        {/* Round Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {rounds.map((round) => (
            <Button
              key={round.id}
              className={`px-6 py-3 rounded-full h-auto text-lg font-medium transition-all duration-300 ${
                activeRound === round.id
                  ? `bg-[${round.color}] text-white shadow-lg scale-105`
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#30BFDD]"
              }`}
              onClick={() => setActiveRound(round.id)}
            >
              Round {round.id}
            </Button>
          ))}
        </div>

        {/* Round Details Content */}
        {rounds.map((round) => (
          <div
            key={round.id}
            className={`transition-all duration-500 ${
              activeRound === round.id ? "block" : "hidden"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div 
                className="p-6 text-white" 
                style={{ backgroundColor: round.color }}
              >
                <h3 className="text-2xl md:text-3xl font-bold">{round.title}</h3>
                <div className="flex flex-wrap items-center mt-3 space-x-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{round.timing}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4">Round Overview</h4>
                  <p className="text-lg text-gray-700">{round.description}</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-6">Judging Criteria</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {round.criteria.map((criterion, index) => (
                      <div key={index} className="relative pl-12 pr-4 py-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                        <div 
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: round.color }}
                        >
                          {index + 1}
                        </div>
                        <h5 className="font-bold text-lg mb-2">{criterion.title}</h5>
                        <p className="text-gray-700">{criterion.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips Section */}
                <div className="mt-10 p-6 rounded-lg border border-dashed" style={{ borderColor: round.color }}>
                  <div className="flex items-start">
                    <div 
                      className="rounded-full p-2 mr-4 flex-shrink-0"
                      style={{ backgroundColor: `${round.color}20` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        style={{ color: round.color }}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-2">Pro Tips for Round {round.id}</h5>
                      {round.id === 1 && (
                        <p className="text-gray-700">
                          Clearly articulate the problem you're solving and why it matters. Focus on identifying a real need that aligns with the hackathon theme. Prepare a brief presentation that communicates your vision effectively.
                        </p>
                      )}
                      {round.id === 2 && (
                        <p className="text-gray-700">
                          Document your development process. Be ready to explain technical decisions and trade-offs. Focus on creating a minimum viable product that demonstrates your core functionality rather than trying to implement too many features.
                        </p>
                      )}
                      {round.id === 3 && (
                        <p className="text-gray-700">
                          Keep your dashboard clean and intuitive. Focus on storytelling through data visualization. Prepare to explain how your insights address the problem statement and provide actionable recommendations.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        
      </div>
    </section>
  );
}