import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import datumLogo from "@assets/Screenshot_2025-04-01_201751-removebg-preview.png";
import glaLogo from "@assets/GLA_University_logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Themes", href: "#themes" },
    { name: "Timeline", href: "#timeline" },
    { name: "FAQ", href: "#faq" },
    { name: "Organizers", href: "#organizers" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (href) => {
    setIsOpen(false);
    if (location !== "/") {
      window.location.href = "/" + href;
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full bg-[#2B2D42] text-white z-50 shadow-md transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <img src={datumLogo} alt="Datum Club Logo" className="h-10 mr-3" />
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                <span className="text-[#30BFDD]">DATUM</span> CLUB
              </span>
              <span className="text-xs text-gray-300">at GLA University</span>
            </div>
          </Link>
          <img
            src={glaLogo}
            alt="GLA University Logo"
            className="h-10 ml-2 hidden sm:block"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleNavLinkClick(link.href)}
              className="font-medium hover:text-[#30BFDD] transition-colors relative nav-link"
            >
              {link.name}
            </button>
          ))}

          <Button
            asChild
            className="text-[#30BFDD] px-6 rounded-full font-semibold"
          >
            <Link href={"/register"}>Register Now</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-0 h-10 w-10 text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#2B2D42] text-white border-l-[#8D99AE]"
            >
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavLinkClick(link.href)}
                    className="font-medium hover:text-[#30BFDD] transition-colors py-2 text-left"
                  >
                    {link.name}
                  </button>
                ))}
                <Button
                  asChild
                  className="bg-[#d1cacb] text-[#000000] rounded-full font-semibold w-full mt-4"
                >
                  <Link href={"/register"} onClick={() => setIsOpen(false)}>
                    Register Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
