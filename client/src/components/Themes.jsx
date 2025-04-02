// import React from "react";
// import { Card } from "@/components/ui/card";

// const ThemeCard = ({ title, description, tags, image }) => {
//   return (
//     <Card className="theme-card relative rounded-xl overflow-hidden shadow-lg h-80 group cursor-pointer border-none">
//       <img 
//         src={image} 
//         alt={title} 
//         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-[#2B2D42] to-transparent opacity-70 flex flex-col justify-end p-6 transition-opacity duration-300">
//         <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
//         <p className="text-white text-sm mb-4">{description}</p>
//         <div className="flex flex-wrap gap-2">
//           {tags.map((tag, index) => (
//             <span key={index} className="bg-[#EF233C]/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default function Themes() {
//   const themes = [
//     {
//       title: "Healthcare Innovation",
//       description: "Develop solutions to improve healthcare accessibility, patient care, or medical data management",
//       tags: ["AI Diagnosis", "Telemedicine", "Patient Care"],
//       image: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
//     },
//     {
//       title: "Sustainable Future",
//       description: "Create technologies addressing environmental challenges and promoting sustainability",
//       tags: ["Clean Energy", "Waste Management", "Smart Cities"],
//       image: "https://images.unsplash.com/photo-1593941707882-a5bba13938c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
//     },
//     {
//       title: "EdTech Revolution",
//       description: "Revolutionize education through technology to make learning more accessible and effective",
//       tags: ["Remote Learning", "VR/AR Education", "Personalized Learning"],
//       image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
//     },
//     {
//       title: "Fintech Solutions",
//       description: "Develop innovative financial technology solutions to improve access, security, and efficiency",
//       tags: ["Digital Banking", "Blockchain", "Financial Inclusion"],
//       image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
//     },
//     {
//       title: "Smart Cities",
//       description: "Create urban technological solutions to improve infrastructure, services, and quality of life",
//       tags: ["IoT Solutions", "Urban Mobility", "Public Safety"],
//       image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
//     },
//     {
//       title: "Open Innovation",
//       description: "Create any innovative solution that doesn't fit into other categories but has significant impact",
//       tags: ["Social Impact", "Emerging Tech", "Creative Solutions"],
//       image: "https://images.unsplash.com/photo-1507120410856-1f35574c3b45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
//     },
//   ];

//   return (
//     <section id="themes" className="py-16 md:py-24 relative">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Hackathon Themes</h2>
//           <p className="text-lg max-w-2xl mx-auto">Explore our diverse theme categories that tackle real-world challenges.</p>
//           <div className="w-24 h-1 bg-[#EF233C] mx-auto mt-4"></div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {themes.map((theme, index) => (
//             <ThemeCard key={index} {...theme} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, AlertCircle } from "lucide-react";

export default function Themes() {
  return (
    <section id="themes" className="py-16 md:py-10 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hackathon Themes</h2>
          <p className="text-lg max-w-2xl mx-auto">Our exciting theme categories will be revealed soon.</p>
          <div className="w-24 h-1 bg-[#30BFDD] mx-auto mt-4"></div>
        </div>
        
        <Card className="max-w-3xl mx-auto overflow-hidden shadow-lg border-none bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-[#30BFDD]/20 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-[#30BFDD]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Themes Coming Soon</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              We're finalizing our innovative challenge themes that will tackle real-world problems. 
              Check back later for the official theme announcement.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-[#30BFDD]" />
                <span>Coming in the next update</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <AlertCircle className="w-5 h-5 text-[#30BFDD]" />
                <span>Stay tuned for updates</span>
              </div>
            </div>
          </div>
        </Card>
      
      </div>
    </section>
  );
}