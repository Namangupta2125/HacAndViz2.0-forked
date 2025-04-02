import React from "react";

export default function Legacy() {
  return (
    <section id="legacy" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Legacy</h2>
          <p className="text-lg max-w-2xl mx-auto">Celebrating our journey and past achievements</p>
          <div className="w-24 h-1 bg-[#EF233C] mx-auto mt-4"></div>
        </div>
        
        {/* Hack and Viz 1.0 Highlights */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Hack and Viz 1.0 Highlights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-medium mb-4">By the Numbers</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#EF233C] mb-1">150+</div>
                    <div className="text-sm text-gray-600">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#EF233C] mb-1">32</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#EF233C] mb-1">12</div>
                    <div className="text-sm text-gray-600">Universities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#EF233C] mb-1">8</div>
                    <div className="text-sm text-gray-600">Sponsors</div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-xl font-medium mb-4">Winning Projects</h4>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EF233C] mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                    <h5 className="font-medium">MediScan</h5>
                  </div>
                  <p className="text-sm text-gray-600">AI-powered medical image analysis for early disease detection</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EF233C] mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h5 className="font-medium">EcoTrack</h5>
                  </div>
                  <p className="text-sm text-gray-600">Environmental monitoring platform using IoT sensors</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EF233C] mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <h5 className="font-medium">StudyBuddy</h5>
                  </div>
                  <p className="text-sm text-gray-600">Collaborative learning platform with AI-guided study plans</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Hack and Viz 1.0 winners" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Participants working at Hack and Viz 1.0" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="https://images.unsplash.com/photo-1558222218-b01b9df0bad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Hack and Viz 1.0 presentations" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Team collaboration at Hack and Viz 1.0" 
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    </section>
  );
}