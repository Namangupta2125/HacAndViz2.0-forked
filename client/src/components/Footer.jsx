import React from "react";

export default function Footer() {
  const handleNavigation = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#2B2D42] text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-[#30BFDD]">DATUM</span> CLUB
            </h3>
            <p className="mb-4">
              The premier technical club at GLA University, focused on data
              science, analytics, and visualization.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("about")}
                  className="hover:text-[#30BFDD] transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("faq")}
                  className="hover:text-[#30BFDD] transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("register")}
                  className="hover:text-[#30BFDD] transition-colors"
                >
                  Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("organizers")}
                  className="hover:text-[#30BFDD] transition-colors"
                >
                  Organizers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-1 mr-3 text-[#30BFDD] flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>GLA University Campus</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-[#30BFDD] flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href="mailto:harsh.gautam_cs22@gla.ac.in"
                  className="hover:text-[#30BFDD] transition-colors"
                >
                  harsh.gautam_cs22@gla.ac.in
                </a>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-[#30BFDD] flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href="mailto:sayantan.sinha@gla.ac.in"
                  className="hover:text-[#30BFDD] transition-colors"
                >
                  sayantan.sinha@gla.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-sm text-white/70">© {new Date().getFullYear()} DATUM CLUB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}