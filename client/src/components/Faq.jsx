import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const faqItems = [
    {
      question: "Who can participate?",
      answer: "Hack and Viz 2.0 is open to GLA universuty students f. You don't need to be a computer science student - we welcome participants from all disciplines!"
    },
    {
      question: "Is there a registration fee?",
      answer: "Yes, the registration fees is 100 INR per member of the team. You can pay through the link provided in the registration form."
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop, charger, student ID, and any hardware you might need for your project. We'll provide workspace, internet, meals, and plenty of coffee!"
    },
    {
      question: "How are teams formed?",
      answer: "You can register with a team of (3-4 members). Each team member should be from different year."
    },
    {
      question: "What if I'm a beginner?",
      answer: "Beginners are absolutely welcome! We'll have mentors available throughout the event to help you, plus pre-hackathon workshops to help you prepare. This is a learning opportunity for everyone."
    },
    {
      question: "How will projects be judged?",
      answer: "Projects will be evaluated based on innovation, technical complexity, practicality, presentation, and adherence to the chosen theme. Our panel of judges includes industry professionals and faculty members."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg max-w-2xl mx-auto">Find answers to common questions about Hack and Viz 2.0</p>
          <div className="w-24 h-1 bg-[#30BFDD] mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-xl font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        
        </div>
      </div>
    </section>
  );
}