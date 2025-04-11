import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  X,
  Brain,
  Trash2,
  Sliders,
  Clock,
  Wallet,
  HandMetal,
  Merge,
  Heart,
  Lightbulb,
  Wifi,
  Briefcase,
  Eye,
  Monitor,
} from "lucide-react";
import anti from "../../../attached_assets/IMG-20250411-WA0006.jpg";

const ThemeCard = ({
  title,
  description,
  fullDescription,
  examples,
  challenge,
  criteria,
  imageIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Image URLs for theme cards
  const backgroundImages = [
    "https://i.pinimg.com/736x/a1/11/d2/a111d298d5f257bca6f0e8b5eeb76b96.jpg", // Schrödinger's Hackathon
    "https://static.vecteezy.com/system/resources/previews/017/156/302/non_2x/cyber-safety-cyber-security-and-privacy-concept-man-holding-online-protection-shield-as-symbol-of-defense-and-secure-person-defending-and-protecting-data-illustration-vector.jpg", // The Anti-Hack
    "https://img.freepik.com/free-photo/illustration-geometric-shapes-with-colorful-neon-laser-lights-perfect-backgrounds_181624-34429.jpg", // The Paradox Hack
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMpGlyXPCoijOVhlqHuLF6CeWOKzVbJ4i_cA&s", // The Black Mirror Hack
    "https://img.freepik.com/free-vector/gradient-numerology-background_23-2150011413.jpg", // The 5th Dimension Hack
    "https://img.freepik.com/premium-vector/hands-with-transport-card-smartphone-smartwatch-bank-card-near-pos-terminal-wireless-contactless-cashless-payments-rfid-nfc-vector-illustration-flat-style_169241-3899.jpg", // The Invisible Economy Challenge
    "https://media.istockphoto.com/id/1390783215/photo/faceless-hooded-hacker-showing-silence-gesture-cyber-attack-system-breaking-and-malware.jpg?s=612x612&w=0&k=20&c=_LUaKk2yNmXg1uLd2R7P1k9-OVUyh8RZrdHphz0zXTc=", // The Silence Hack
    "https://media.istockphoto.com/id/939444810/vector/blackboard-inscribed-with-scientific-formulas-and-calculations-in-physics-and-mathematics-can.jpg?s=612x612&w=0&k=20&c=IyJw3M9YSPv1mDQ7Y3LghNXs9rrB3vvrYMiBnkjWmo0=", // The Quantum Creativity Hack
    "https://static.vecteezy.com/system/resources/thumbnails/030/470/986/small/a-group-of-emoticons-with-different-emotions-ai-generated-photo.jpg", // The Emotion Engine
    "https://c.stocksy.com/a/oOjM00/z9/5417734.jpg", // The Paradox Hack: Solve the Unsolvable
    "https://t4.ftcdn.net/jpg/05/61/87/97/360_F_561879769_ge3aCp4Ga8t0rWBvuss5XHDOXHVuUqwW.jpg", // The No-Internet Hack
    "https://thumbs.dreamstime.com/b/artificial-intelligence-ai-research-robot-cyborg-development-future-people-living-digital-data-mining-machine-learning-171270756.jpg", // The Future of Work
    "https://img.freepik.com/free-vector/augmented-reality-background-flat-style_23-2147803487.jpg", // The Sensory Augmentation Hack
    "https://media.istockphoto.com/id/1335295270/photo/global-connection.jpg?s=612x612&w=0&k=20&c=pVIatR8XcihqKTDnISYXNWvSkpZkdeJJa3YNfk9zC6g=", // The Dreamworld Hack
  ];

  const getIconForTheme = (title) => {
    const iconMapping = {
      "Schrödinger's Hackathon": <Brain size={48} />,
      "The Anti-Hack": <Trash2 size={48} />,
      "The Paradox Hack": <Lightbulb size={48} />,
      "The Black Mirror Hack": <Sliders size={48} />,
      "The 5th Dimension Hack": <Clock size={48} />,
      "The Invisible Economy Challenge": <Wallet size={48} />,
      "The Silence Hack": <HandMetal size={48} />,
      "The Quantum Creativity Hack": <Merge size={48} />,
      "The Emotion Engine": <Heart size={48} />,
      "The No-Internet Hack": <Wifi size={48} strokeWidth={0.5} />,
      "The Future of Work": <Briefcase size={48} />,
      "The Sensory Augmentation Hack": <Eye size={48} />,
      "The Dreamworld Hack": <Monitor size={48} />,
    };

    return iconMapping[title] || <Lightbulb size={48} />;
  };

  return (
    <>
      <Card
        className="theme-card relative rounded-xl overflow-hidden shadow-lg h-80 group cursor-pointer border-2 border-gray-100 hover:border-[#30BFDD] transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={backgroundImages[imageIndex || 0]}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/70 to-transparent opacity-80"></div>
        </div>

        {/* Theme Icon */}
        <div className="absolute top-6 left-6 text-white z-10 bg-[#30BFDD]/30 p-3 rounded-full backdrop-blur-sm">
          {getIconForTheme(title)}
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border-l-4 border-[#30BFDD]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#30BFDD] text-white text-xs px-3 py-1 rounded-full font-medium">
                  View Details
                </span>
              </div>
              <div className="text-[#30BFDD] font-bold text-xs uppercase tracking-wider">
                Challenge
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#30BFDD] z-10"></div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-[#30BFDD]">{getIconForTheme(title)}</div>
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            </div>
            <DialogDescription className="text-base font-medium">
              {description}
            </DialogDescription>
          </DialogHeader>

          {/* Header Image in Dialog */}
          <div className="w-full h-48 rounded-lg overflow-hidden my-4">
            <img
              src={backgroundImages[imageIndex || 0]}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4">
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                <span className="w-1 h-6 bg-[#30BFDD] rounded mr-2"></span>
                Concept
              </h4>
              <p className="text-gray-700">{fullDescription}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                <span className="w-1 h-6 bg-[#30BFDD] rounded mr-2"></span>
                Examples
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {examples.map((example, idx) => (
                  <li key={idx}>
                    <strong>{example.title}</strong> – {example.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                <span className="w-1 h-6 bg-[#30BFDD] rounded mr-2"></span>
                Challenge
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {challenge.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                <span className="w-1 h-6 bg-[#30BFDD] rounded mr-2"></span>
                Judging Criteria
              </h4>
              <ul className="list-none pl-2 space-y-1 text-gray-700">
                {criteria.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#30BFDD] font-bold">✓</span>
                    <span>
                      <strong>{item.criteria}:</strong> {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function Themes() {
  const themes = [
    {
      title: "Schrödinger's Hackathon",
      description: "Build What Doesn't Exist (Yet)",
      fullDescription:
        "Participants must develop prototypes for technologies that could exist but don't yet—blending science fiction with engineering feasibility. The challenge encourages teams to push the boundaries of innovation while remaining grounded in real-world constraints.",
      examples: [
        {
          title: "Emotion-Transmitting Wi-Fi",
          description: "A network that shares feelings instead of data.",
        },
        {
          title: "Self-Healing Roads",
          description: "Infrastructure that repairs cracks autonomously.",
        },
        {
          title: "Dream Recorder App",
          description: "AI that reconstructs dreams from brainwave data.",
        },
      ],
      challenge: [
        "Why hasn't this been built yet? (Technical, ethical, economic barriers)",
        "How could it become viable in the next decade?",
      ],
      criteria: [
        {
          criteria: "Feasibility",
          description: "Can this realistically exist?",
        },
        { criteria: "Creativity", description: "How original is the concept?" },
        {
          criteria: "Impact",
          description: "If successful, how transformative would it be?",
        },
      ],
    },
    {
      title: "The Anti-Hack",
      description: "Destroy to Rebuild",
      fullDescription:
        "True innovation often starts with deconstruction. In this challenge, teams must first identify and ethically break an existing system—such as an app, website, or digital infrastructure—before rebuilding it into a stronger, more secure, and efficient version within 24 hours.",
      examples: [
        {
          title: "Breaking and Fixing a Payment Gateway",
          description:
            "Identifying vulnerabilities in an online transaction system and securing it.",
        },
        {
          title: "Deconstructing a Social Media Algorithm",
          description:
            "Exposing biases and designing a fairer engagement model.",
        },
        {
          title: "Redesigning a Government Website",
          description: "Streamlining a complex and outdated service portal.",
        },
      ],
      challenge: [
        "Find and exploit weaknesses in an existing system.",
        "Rebuild it with improved security, usability, or efficiency.",
        "Defend your choices in front of judges.",
      ],
      criteria: [
        {
          criteria: "Critical Thinking",
          description: "How well was the system analyzed and deconstructed?",
        },
        {
          criteria: "Innovation",
          description: "How effective and creative is the new solution?",
        },
        {
          criteria: "Security & Efficiency",
          description: "Does the rebuilt version solve key issues?",
        },
      ],
    },
    {
      title: "The Paradox Hack",
      description: "Solve a Problem by Creating a New One",
      fullDescription:
        "Every technological solution introduces unintended consequences. In this challenge, teams must build something that fixes a real-world problem but, in doing so, intentionally creates a new challenge that users must navigate.",
      examples: [
        {
          title: "Screen Time Reducer App",
          description:
            "Lowers smartphone addiction but increases compulsive walking.",
        },
        {
          title: "AI Tutor That Never Gives Direct Answers",
          description:
            "Forces deeper thinking but frustrates impatient learners.",
        },
        {
          title: "Eco-Friendly Fast Food Packaging",
          description:
            "100% biodegradable but dissolves too quickly in humidity.",
        },
      ],
      challenge: [
        "Identify a major problem and develop an innovative solution.",
        "Ensure that the solution introduces a new, non-trivial challenge.",
        "Justify why the tradeoff is worth it.",
      ],
      criteria: [
        {
          criteria: "Balance",
          description: "How well does the new problem balance the solution?",
        },
        {
          criteria: "Innovation",
          description: "Is the approach unique and thought-provoking?",
        },
        {
          criteria: "Practicality",
          description: "Would people actually use this despite its tradeoff?",
        },
      ],
    },
    // Add remaining themes as they are...
    {
      title: "The Black Mirror Hack",
      description: "Dystopian Tech Turned Ethical",
      fullDescription:
        "Teams must design technology that initially appears unethical, dystopian, or invasive but can be pivoted into a tool for societal good. This challenge highlights the fine line between innovation and ethics.",
      examples: [
        {
          title: "AI-Powered Surveillance",
          description:
            "Instead of tracking individuals, it identifies missing persons in emergencies.",
        },
        {
          title: "Deepfake Generator",
          description:
            "Used to preserve the voices of people with degenerative diseases.",
        },
        {
          title: "Emotion-Detection Software",
          description: "Adapted to help therapists detect signs of depression.",
        },
      ],
      challenge: [
        "Develop a morally ambiguous or controversial technology.",
        "Reframe it into something that benefits society.",
        "Address the ethical concerns and propose safeguards.",
      ],
      criteria: [
        {
          criteria: "Ethical Adaptation",
          description: "How well was the dystopian tech repurposed?",
        },
        {
          criteria: "Practicality",
          description: "Can this truly be implemented?",
        },
        {
          criteria: "Societal Impact",
          description: "Does this solve a real-world problem?",
        },
      ],
    },
    {
      title: "The 5th Dimension Hack",
      description: "Time as a Variable",
      fullDescription:
        "In this challenge, teams must build technology that manipulates time in some way—whether predicting the future, altering past data, or optimizing present actions based on future consequences.",
      examples: [
        {
          title: "Procrastination Rewinder",
          description:
            "An app that 'rewinds' unproductive hours by automatically rescheduling tasks.",
        },
        {
          title: "Predictive Crime Prevention",
          description:
            "AI analyzes behavior patterns to predict and prevent crimes.",
        },
        {
          title: "Reverse Aging Filter",
          description:
            "A medical AI that predicts and suggests lifestyle changes based on future health risks.",
        },
      ],
      challenge: [
        "Integrate time as a key component in the project.",
        "Justify how time manipulation can be ethically and practically applied.",
        "Ensure the idea doesn't lead to harmful unintended consequences.",
      ],
      criteria: [
        {
          criteria: "Innovation",
          description: "How creatively is time incorporated?",
        },
        {
          criteria: "Feasibility",
          description:
            "Is it possible to implement this within existing tech constraints?",
        },
        {
          criteria: "Ethical Considerations",
          description:
            "Does the time manipulation create more problems than it solves?",
        },
      ],
    },
    {
      title: "The Invisible Economy Challenge",
      description: "Financial Solutions for Informal Workers",
      fullDescription:
        "Millions of workers operate outside traditional financial systems. This challenge invites teams to create solutions for undocumented workers, street vendors, and informal laborers, enabling financial inclusion without reliance on banks or centralized authorities.",
      examples: [
        {
          title: "Cashless Payment for Day Laborers",
          description:
            "A peer-to-peer mobile transaction system with no bank account needed.",
        },
        {
          title: "Anonymous Digital Identity",
          description:
            "Blockchain-based work history tracking without official documentation.",
        },
        {
          title: "Smart Bartering System",
          description:
            "A platform that lets street vendors trade goods/services digitally.",
        },
      ],
      challenge: [
        "Address financial invisibility in a scalable, legal, and practical way.",
        "Ensure solutions work without traditional banking or government ID requirements.",
        "Avoid exploitation risks in informal labor markets.",
      ],
      criteria: [
        {
          criteria: "Accessibility",
          description: "Does this truly serve marginalized groups?",
        },
        {
          criteria: "Sustainability",
          description: "Can this solution scale and remain financially viable?",
        },
        {
          criteria: "Security & Privacy",
          description: "Does it protect users from exploitation or fraud?",
        },
      ],
    },
    {
      title: "The Silence Hack",
      description: "No Talking, Only Building",
      fullDescription:
        "Communication is essential in team projects—but what if verbal and written communication were banned? In this hackathon, teams must collaborate using only code comments, gestures, and visual tools, forcing them to focus on clarity and documentation.",
      examples: [
        {
          title: "Gesture-Controlled Programming",
          description: "A prototype where coding is done through hand signals.",
        },
        {
          title: "Emoji-Based Task Management",
          description:
            "A project management tool where tasks are assigned using icons.",
        },
        {
          title: "Self-Explaining Code",
          description:
            "A software tool that generates ultra-clear comments based on code structure.",
        },
      ],
      challenge: [
        "Develop a project without speaking, typing messages, or using traditional documentation tools.",
        "Ensure that all team members understand their roles without explicit instructions.",
        "Maintain detailed, self-explanatory documentation through alternative means.",
      ],
      criteria: [
        {
          criteria: "Clarity",
          description: "Is the project easy to understand without explanation?",
        },
        {
          criteria: "Collaboration",
          description: "How well did the team coordinate without words?",
        },
        {
          criteria: "Innovation",
          description: "Did the team develop new ways to communicate?",
        },
      ],
    },
    {
      title: "The Quantum Creativity Hack",
      description: "Forced Mergers",
      fullDescription:
        "Innovation thrives under constraints. In this challenge, every four hours, teams must randomly merge their project with another team's, forcing rapid adaptation and cross-discipline collaboration.",
      examples: [
        {
          title: "Fitness App + AI Storytelling",
          description:
            "An app that narrates a personalized adventure story based on workout data.",
        },
        {
          title: "Smart Farming + Augmented Reality",
          description:
            "AR glasses that provide real-time crop health insights to farmers.",
        },
        {
          title: "Blockchain + Mental Health",
          description:
            "A decentralized platform that ensures privacy for therapy sessions.",
        },
      ],
      challenge: [
        "Adapt and merge unrelated projects every four hours.",
        "Justify why and how the new project combination adds value.",
        "Deliver a working prototype by the end despite multiple pivots.",
      ],
      criteria: [
        {
          criteria: "Adaptability",
          description: "How well did the team integrate new ideas?",
        },
        {
          criteria: "Creativity",
          description:
            "Did the mergers lead to unexpected but valuable solutions?",
        },
        {
          criteria: "Execution",
          description:
            "Is the final product functional despite forced changes?",
        },
      ],
    },
    {
      title: "The Emotion Engine",
      description: "Code That Feels",
      fullDescription:
        "Technology often focuses on efficiency, but what if it could evoke real human emotions? Teams must build applications that generate or simulate deep emotional responses.",
      examples: [
        {
          title: "AI Grief-Support Poet",
          description:
            "A chatbot that generates poetry based on personal loss.",
        },
        {
          title: "Music Generator for Mood Enhancement",
          description:
            "AI that composes songs tailored to a user's emotional state.",
        },
        {
          title: "Empathy VR",
          description:
            "A virtual reality experience that puts users in another person's perspective.",
        },
      ],
      challenge: [
        "Build tech that triggers genuine emotions—joy, nostalgia, empathy, catharsis.",
        "Ensure the system adapts to different users' emotional needs.",
        "Avoid artificial, scripted responses; aim for authenticity.",
      ],
      criteria: [
        {
          criteria: "Emotional Depth",
          description: "Does it create a real impact on users?",
        },
        {
          criteria: "Creativity",
          description:
            "Is this an original approach to emotion-based technology?",
        },
        {
          criteria: "Authenticity",
          description: "Does it feel real rather than artificially programmed?",
        },
      ],
    },
    {
      title: "The Paradox Hack: Solve the Unsolvable",
      description: "Tackle problems that seem impossible to resolve",
      fullDescription:
        "Teams must embrace contradictions and tackle problems that seem impossible to resolve. The goal is to find innovative workarounds, alternative perspectives, or redefine the problem itself.",
      examples: [
        {
          title: "Privacy vs. Personalization",
          description:
            "An AI assistant that offers personalized services without storing user data.",
        },
        {
          title: "Security vs. Convenience",
          description:
            "A login system that is both ultra-secure and effortless.",
        },
        {
          title: "Infinite Storage in Finite Space",
          description: "A data compression method that breaks known limits.",
        },
      ],
      challenge: [
        "Pick a known paradox or contradiction in technology, society, or science.",
        "Develop a viable solution, even if it's unconventional or reframes the issue.",
        "Justify why your approach resolves or circumvents the paradox.",
      ],
      criteria: [
        {
          criteria: "Originality",
          description: "Is this a fresh take on an old problem?",
        },
        {
          criteria: "Practicality",
          description: "Does it work in real-world conditions?",
        },
        {
          criteria: "Impact",
          description: "Would solving this paradox change the industry?",
        },
      ],
    },
    {
      title: "The No-Internet Hack",
      description: "Offline First",
      fullDescription:
        "Modern apps depend on the internet, but what if connectivity was unreliable or nonexistent? This challenge focuses on designing software, hardware, or systems that function entirely offline.",
      examples: [
        {
          title: "Decentralized File Sharing",
          description:
            "A peer-to-peer network for data exchange without the internet.",
        },
        {
          title: "Offline Search Engine",
          description:
            "A knowledge base that provides useful info without needing to go online.",
        },
        {
          title: "Mesh Network for Disaster Response",
          description:
            "A local communication system that operates without cell towers.",
        },
      ],
      challenge: [
        "Ensure the solution is truly useful without any internet access.",
        "Handle data storage, synchronization, and communication offline.",
        "Make it scalable and practical for different environments.",
      ],
      criteria: [
        {
          criteria: "Resilience",
          description: "How well does it function without connectivity?",
        },
        {
          criteria: "Usability",
          description: "Is it intuitive despite offline limitations?",
        },
        {
          criteria: "Applicability",
          description: "Could this help in real-world scenarios?",
        },
      ],
    },
    {
      title: "The Future of Work",
      description: "AI & Automation",
      fullDescription:
        "AI is reshaping jobs, but can it create more opportunities than it eliminates? Teams must design solutions that redefine employment in an automated world.",
      examples: [
        {
          title: "AI Job Mentor",
          description:
            "A platform that retrains workers for AI-driven industries.",
        },
        {
          title: "Smart Resume Generator",
          description:
            "A system that dynamically updates resumes based on industry trends.",
        },
        {
          title: "Automation Tax System",
          description:
            "A proposal for funding universal basic income via AI-driven productivity.",
        },
      ],
      challenge: [
        "Address job displacement concerns.",
        "Propose ways AI can enhance, not replace, human workers.",
        "Balance efficiency with ethical employment considerations.",
      ],
      criteria: [
        {
          criteria: "Economic Impact",
          description: "Does it improve job security or create new roles?",
        },
        {
          criteria: "Feasibility",
          description: "Can this be adopted by companies today?",
        },
        {
          criteria: "Long-Term Sustainability",
          description: "Will this still be relevant in 10 years?",
        },
      ],
    },
    {
      title: "The Sensory Augmentation Hack",
      description: "Enhancing Human Perception",
      fullDescription:
        "What if humans could perceive more than the five senses allow? Teams must develop technology that enhances or expands human sensory abilities.",
      examples: [
        {
          title: "Infrared Vision Wearables",
          description: "Glasses that allow humans to see heat signatures.",
        },
        {
          title: "AI-Powered Taste Synthesizer",
          description: "A device that generates any taste on command.",
        },
        {
          title: "Haptic Internet",
          description: "A system that lets users 'feel' digital interactions.",
        },
      ],
      challenge: [
        "Ensure the new sense is genuinely useful, not just a novelty.",
        "Justify its impact on human experience.",
        "Avoid sensory overload or unintended consequences.",
      ],
      criteria: [
        {
          criteria: "Utility",
          description: "Does it provide meaningful enhancement?",
        },
        {
          criteria: "Innovation",
          description: "Is it a novel approach to human perception?",
        },
        {
          criteria: "Safety & Ethics",
          description: "Does it respect natural sensory limits?",
        },
      ],
    },
    {
      title: "The Dreamworld Hack",
      description: "Altering Reality",
      fullDescription:
        "From AR to lucid dreaming, this challenge explores ways to modify, extend, or manipulate reality itself.",
      examples: [
        {
          title: "AI-Generated Dream Environments",
          description:
            "A VR experience that mirrors subconscious thought patterns.",
        },
        {
          title: "Shared Augmented Reality Workspaces",
          description:
            "A system where remote teams collaborate in a holographic environment.",
        },
        {
          title: "Hyper-Personalized Reality Filter",
          description: "AR that changes the world based on user preferences.",
        },
      ],
      challenge: [
        "Ensure the altered reality is immersive yet practical.",
        "Avoid risks of dissociation from real-world responsibilities.",
        "Maintain user agency and control.",
      ],
      criteria: [
        {
          criteria: "Immersion",
          description: "How convincingly does it alter perception?",
        },
        {
          criteria: "Usability",
          description: "Is it intuitive and beneficial?",
        },
        {
          criteria: "Psychological Safety",
          description: "Does it enhance rather than distort reality?",
        },
      ],
    },
  ];

  return (
    <section id="themes" className="py-16 md:py-10 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hackathon Themes
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Challenge your creativity with these innovative hackathon concepts
          </p>
          <div className="w-24 h-1 bg-[#30BFDD] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <ThemeCard key={index} {...theme} imageIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
