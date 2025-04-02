import React from "react";

export default function Timeline() {
  const timelineItems = [
    {
      day: "19th April - Morning",
      timeSlot: "9:00 AM - 10:00 AM",
      leftEvent: {
        title: "Team Reporting",
        description: "Have your entry and settle in"
      },
      rightEvent: {
        title: "Inauguration Program",
        time: "10:00 AM - 11:00 AM",
        description: "Welcome address and theme announcements"
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      day: "19th April - Afternoon",
      timeSlot: "11:00 AM - 2:00 PM",
      leftEvent: {
        title: "Hackathon",
        description: "Support from Internal Organizing Committee Members"
      },
      rightEvent: {
        title: "Lunch Break",
        time: "1:00 PM - 2:00 PM",
        description: "Hostel students: respective mess, Day scholars: BYOL"
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      )
    },
    {
      day: "19th April - Evening",
      timeSlot: "2:00 PM - 7:00 PM",
      leftEvent: {
        title: "Mentoring Continues + Internal Evaluation",
        description: "Teams work on their projects with ongoing support"
      },
      rightEvent: {
        title: "Hackathon Continue",
        description: "Students continues to work on the problem statements"
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      day: "20th April - Morning",
      timeSlot: "7:00 AM - 12:00 PM",
      leftEvent: {
        title: "Wakeup Tea & Refreshments",
        time: "7:00 AM - 8:00 AM",
        description: "Morning energizer"
      },
      rightEvent: {
        title: "Breakfast for all Students",
        time: "8:00 AM - 9:00 AM",
        description: "Continue project work after breakfast"
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      )
    },
    {
      day: "20th April - Evening",
      timeSlot: "3:00 PM - 6:00 PM",
      leftEvent: {
        title: "Final Evaluation by Jury",
        description: "Present your data visualization dashboard"
      },
      rightEvent: {
        title: "Valedictory & Closing",
        time: "5:00 PM - 6:00 PM",
        description: "Result announcement, trophies to top teams & group photo"
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    },
  ];

  return (
    <section id="timeline" className="py-16 md:py-24 bg-[#2B2D42] text-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Timeline</h2>
          <p className="text-lg max-w-2xl mx-auto">Mark your calendar and prepare for an exciting journey!</p>
          <div className="w-24 h-1 bg-[#30BFDD] mx-auto mt-4"></div>
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#30BFDD]"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-0">
            {timelineItems.map((item, index) => (
              <div key={index} className="md:flex md:items-center md:justify-between mb-12">
                <div className="md:w-5/12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold text-[#30BFDD]">{item.day}</h3>
                  <h4 className="text-lg font-medium mb-2">{item.timeSlot}</h4>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-block">
                    <h5 className="font-medium mb-1">{item.leftEvent.title}</h5>
                    <p className="text-sm text-gray-300">
                      {item.leftEvent.time && <span>{item.leftEvent.time}<br /></span>}
                      {item.leftEvent.description}
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:block relative w-12 h-12 bg-[#30BFDD] rounded-full border-4 border-[#2B2D42] z-10 mx-auto">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                    {item.icon}
                  </div>
                </div>
                
                <div className="md:w-5/12">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-block">
                    <h5 className="font-medium mb-1">{item.rightEvent.title}</h5>
                    <p className="text-sm text-gray-300">
                      {item.rightEvent.time && <span>{item.rightEvent.time}<br /></span>}
                      {item.rightEvent.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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