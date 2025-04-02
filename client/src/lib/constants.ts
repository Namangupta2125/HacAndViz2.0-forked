// Event dates and deadlines
export const eventStartDate = "April 19, 2025 09:00:00";
export const eventEndDate = "April 20, 2025 19:00:00";
export const registrationDeadline = "April 10, 2025 23:59:59";

// Themes for hackathon
export const hackathonThemes = [
  {
    title: "Healthcare Innovation",
    description: "Develop solutions to improve healthcare accessibility, patient care, or medical data management",
    tags: ["AI Diagnosis", "Telemedicine", "Patient Care"],
    image: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Sustainable Future",
    description: "Create technologies addressing environmental challenges and promoting sustainability",
    tags: ["Clean Energy", "Waste Management", "Smart Cities"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba13938c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "EdTech Revolution",
    description: "Revolutionize education through technology to make learning more accessible and effective",
    tags: ["Remote Learning", "VR/AR Education", "Personalized Learning"],
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Fintech Solutions",
    description: "Develop innovative financial technology solutions to improve access, security, and efficiency",
    tags: ["Digital Banking", "Blockchain", "Financial Inclusion"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Smart Cities",
    description: "Create urban technological solutions to improve infrastructure, services, and quality of life",
    tags: ["IoT Solutions", "Urban Mobility", "Public Safety"],
    image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Open Innovation",
    description: "Create any innovative solution that doesn't fit into other categories but has significant impact",
    tags: ["Social Impact", "Emerging Tech", "Creative Solutions"],
    image: "https://images.unsplash.com/photo-1507120410856-1f35574c3b45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
];

// Timeline data for event
export const timelineItems = [
  {
    day: "Day 1 - Morning",
    timeSlot: "8:00 AM - 10:00 AM",
    leftEvent: {
      title: "Registration & Check-in",
      description: "Collect your event kit and settle in"
    },
    rightEvent: {
      title: "Opening Ceremony",
      time: "10:00 AM - 11:00 AM",
      description: "Welcome address and theme announcements"
    },
    icon: "user"
  },
  {
    day: "Day 1 - Afternoon",
    timeSlot: "11:00 AM - 6:00 PM",
    leftEvent: {
      title: "Hacking Begins!",
      description: "Teams start working on their projects"
    },
    rightEvent: {
      title: "Workshops & Mentorship",
      time: "2:00 PM - 5:00 PM",
      description: "Technical workshops and mentor sessions"
    },
    icon: "code"
  },
  {
    day: "Day 1 - Evening",
    timeSlot: "6:00 PM - 12:00 AM",
    leftEvent: {
      title: "Dinner & Networking",
      description: "Refuel and connect with peers"
    },
    rightEvent: {
      title: "Midnight Activities",
      time: "11:00 PM - 12:00 AM",
      description: "Fun events to keep teams energized"
    },
    icon: "food"
  },
  {
    day: "Day 2 - Morning",
    timeSlot: "8:00 AM - 12:00 PM",
    leftEvent: {
      title: "Breakfast",
      time: "8:00 AM - 9:00 AM",
      description: "Morning refuel"
    },
    rightEvent: {
      title: "Data Visualization Challenge",
      time: "9:00 AM - 3:00 PM",
      description: "6-hour supplementary event begins"
    },
    icon: "coffee"
  },
  {
    day: "Day 2 - Afternoon",
    timeSlot: "12:00 PM - 4:00 PM",
    leftEvent: {
      title: "Final Touches",
      description: "Teams finalize their projects"
    },
    rightEvent: {
      title: "Submission Deadline",
      time: "3:00 PM",
      description: "All projects must be submitted"
    },
    icon: "edit"
  },
  {
    day: "Day 2 - Evening",
    timeSlot: "4:00 PM - 7:00 PM",
    leftEvent: {
      title: "Project Presentations",
      description: "Teams present their solutions to judges"
    },
    rightEvent: {
      title: "Closing Ceremony & Awards",
      time: "6:00 PM - 7:00 PM",
      description: "Winners announced and prizes awarded"
    },
    icon: "award"
  },
];

// FAQ data
export const faqItems = [
  {
    question: "Who can participate?",
    answer: "Hack and Viz 2.0 is open to all undergraduate and postgraduate students from any college or university. You don't need to be a computer science student - we welcome participants from all disciplines!"
  },
  {
    question: "Is there a registration fee?",
    answer: "No, participation is completely free! We believe in making tech events accessible to all students. Just register through our form and you're set to participate."
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, charger, student ID, and any hardware you might need for your project. We'll provide workspace, internet, meals, and plenty of coffee!"
  },
  {
    question: "How are teams formed?",
    answer: "You can register either as an individual or with a team (2-4 members). If you register individually, we'll help you find teammates during our team formation session before the hackathon starts."
  },
  {
    question: "What about accommodation?",
    answer: "Limited accommodation is available for participants traveling from outside the city. Please indicate your accommodation needs in the registration form, and we'll get back to you with details."
  },
  {
    question: "Can I work on a pre-existing project?",
    answer: "No, all projects must be started from scratch at the event. You can come with ideas, but coding or building should begin only after the hackathon officially starts."
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

// Winning projects from Hack and Viz 1.0
export const winningProjects = [
  {
    name: "MediScan",
    description: "AI-powered medical image analysis for early disease detection"
  },
  {
    name: "EcoTrack",
    description: "Environmental monitoring platform using IoT sensors"
  },
  {
    name: "StudyBuddy",
    description: "Collaborative learning platform with AI-guided study plans"
  }
];

// Stats from previous event
export const previousEventStats = {
  participants: "150+",
  projects: "32",
  universities: "12",
  sponsors: "8"
};

// Club achievements
export const clubAchievements = [
  {
    title: "10+ Technical Workshops",
    description: "On data science, ML and visualization"
  },
  {
    title: "3 Annual Hackathons",
    description: "With increasing participation each year"
  },
  {
    title: "Industry Partnerships",
    description: "With leading tech companies"
  },
  {
    title: "Research Publications",
    description: "Student research mentorship program"
  }
];

// Event statistics
export const eventStats = {
  participants: "200+",
  codingHours: "30+",
  prizes: "₹50K+",
  mentors: "10+"
};
