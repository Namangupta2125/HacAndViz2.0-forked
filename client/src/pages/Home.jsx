import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Themes from "@/components/Themes";
import Timeline from "@/components/Timeline";
// import Legacy from "@/components/Legacy";
import Faq from "@/components/Faq";
import Registration from "@/components/Registration";
import Organizers from "@/components/Organizers";
import Footer from "@/components/Footer";
import RoundDetails from "../components/Round_detail";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <RoundDetails />
      <Themes />
      <Timeline />
      {/* <Legacy /> */}
      <Faq />
      <Registration />
      <Organizers />
      <Footer />
    </div>
  );
}
