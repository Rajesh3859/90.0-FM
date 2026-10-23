export interface Episode {
  id: number;
  title: string;
  category: string;
  duration: string;
  durationSeconds: number;
  host: string;
  hostRole: string;
  hostAvatar?: string;
  image: string;
  audioUrl: string;
  description: string;
  date: string;
  topics: string[];
  featured?: boolean;
  listenerCount: string;
}

export interface Program {
  id: number;
  time: string;
  name: string;
  type: string;
  host: string;
  hostRole: string;
  day: string;
  dayCategory: "WEEKDAYS" | "WEEKENDS";
  live?: boolean;
  description: string;
  genre: string;
}

export interface RadioHost {
  id: number;
  name: string;
  show: string;
  yearAndMajor: string;
  bio: string;
  favoriteTrack: string;
  image: string;
}

export interface CampusShoutout {
  id: number;
  sender: string;
  recipient: string;
  message: string;
  timeAgo: string;
  songRequest?: string;
}

export interface StationInfo {
  name: string;
  frequency: string;
  tagline: string;
  frequencySubtitle: string;
  established: string;
  streamUrl: string;
  studioLocation: string;
  studioPhone: string;
  whatsappHotline: string;
  email: string;
  description: string;
  mission: string;
}

export const stationInfo: StationInfo = {
  name: "COLLEGE FM",
  frequency: "90.0 FM",
  tagline: "The voice of the quad, the canteen, and the midnight library grind.",
  frequencySubtitle: "90.0 MHz Community Radio Station",
  established: "Est. 2018",
  streamUrl: "/audio/campus-intro.mp3",
  studioLocation: "Studio B, 2nd Floor, Student Activity Centre",
  studioPhone: "+91 44 2855 9000",
  whatsappHotline: "+91 98400 90000",
  email: "studio@collegefm90.edu",
  description: "90.0 FM is our campus's independent, student-run radio frequency. We broadcast 24/7 across campus and online, featuring authentic student debates, faculty spotlights, acoustic sets, and campus news.",
  mission: "Giving every student a microphone, every indie track a stage, and every hostel story a home.",
};

export const radioHosts: RadioHost[] = [
  {
    id: 1,
    name: "Ananya Iyer",
    show: "Morning Chai & Campus Vibes",
    yearAndMajor: "3rd Year, English Literature",
    bio: "Obsessed with 90s cassette culture, indie acoustic pop, and finding out which campus canteen actually has the best samosas.",
    favoriteTrack: "Northern Sky — Nick Drake",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Kabir Mehta",
    show: "Code, Caffeine & Careers",
    yearAndMajor: "Final Year, Computer Science",
    bio: "Tech club lead by day, late-night lo-fi curator by night. Passionate about demystifying open-source, startup grants, and career panic.",
    favoriteTrack: "Resonance — Home",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Sneha & Rohan",
    show: "The Midnight Quad Sessions",
    yearAndMajor: "2nd Year, Architecture & Design",
    bio: "Co-hosts who disagree on everything except good music. Bringing you ambient soundscapes, student poetry, and live acoustic jam recordings.",
    favoriteTrack: "Holocene — Bon Iver",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Arjun Verma",
    show: "Varsity Sports Pulse",
    yearAndMajor: "3rd Year, Mechanical Engineering",
    bio: "College basketball forward who never misses an inter-collegiate match breakdown or a courtside interview with rising student athletes.",
    favoriteTrack: "Remember the Name — Fort Minor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
];

export const episodes: Episode[] = [
  {
    id: 1,
    title: "Ep 28: The 2 AM Maggi Chronicles & Exam Survival Guide",
    category: "STUDENT LIFE",
    duration: "24 min",
    durationSeconds: 1440,
    host: "Ananya Iyer",
    hostRole: "Station RJ & Lit Senior",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=700&q=85",
    audioUrl: "/audio/campus-intro.mp3",
    description: "Honest, hilarious reflections on surviving midterm week without losing your sanity. Seniors drop their battle-tested tips on note-sharing, coping with hostel noise, and why the 2 AM library vending machine is sacred.",
    date: "Oct 21, 2026",
    topics: ["Midterm Survival", "Hostel Hacks", "Late Night Study Tips"],
    featured: true,
    listenerCount: "2.4k plays",
  },
  {
    id: 2,
    title: "Ep 27: From Dorm Room Hackathon to Y Combinator Funding",
    category: "TECH & STARTUPS",
    duration: "32 min",
    durationSeconds: 1920,
    host: "Kabir Mehta",
    hostRole: "Host, Tech & Innovation",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=85",
    audioUrl: "/audio/sample.mp3",
    description: "An authentic chat with two college alumni who built their AI note-taking app right inside Hostel Block C. They open up about early rejections, balancing final sem project credits, and landing their seed round.",
    date: "Oct 18, 2026",
    topics: ["Student Startups", "Venture Grants", "Balancing Attendance"],
    featured: true,
    listenerCount: "3.8k plays",
  },
  {
    id: 3,
    title: "Ep 26: The Acoustic Amphitheatre: Raw Student Jam Sessions",
    category: "CAMPUS MUSIC",
    duration: "21 min",
    durationSeconds: 1260,
    host: "Music Society Studio",
    hostRole: "Live Production Team",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=85",
    audioUrl: "/audio/campus-intro.mp3",
    description: "Recorded live on vintage condenser mics right under the campus banyan tree. Features unreleased original acoustic compositions and soulful covers by student songwriters from the Music Society.",
    date: "Oct 14, 2026",
    topics: ["Student Bands", "Acoustic Sets", "Unplugged Live"],
    featured: true,
    listenerCount: "4.1k plays",
  },
  {
    id: 4,
    title: "Ep 25: Unfiltered: Midterm Burnout, Imposter Syndrome & Quiet Corners",
    category: "WELLNESS & TALKS",
    duration: "29 min",
    durationSeconds: 1740,
    host: "Sneha & Peer Counselors",
    hostRole: "Campus Wellness Collective",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=85",
    audioUrl: "/audio/sample.mp3",
    description: "A gentle, judgment-free space tackling the pressure to always appear high-achieving. Student peer counselors discuss grounding exercises, setting boundaries with group project slackers, and asking for help without shame.",
    date: "Oct 11, 2026",
    topics: ["Mental Wellness", "Peer Support", "Overcoming Burnout"],
    featured: false,
    listenerCount: "1.9k plays",
  },
  {
    id: 5,
    title: "Ep 24: Underdogs of the Inter-Collegiate Derby: Captain's Debrief",
    category: "SPORTS",
    duration: "19 min",
    durationSeconds: 1140,
    host: "Arjun Verma",
    hostRole: "Sports Council Anchor",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=85",
    audioUrl: "/audio/campus-intro.mp3",
    description: "The thrilling inside story of how our basketball squad bounced back from a 14-point deficit in the final quarter against our regional rivals. Locker room pep talks, tactics, and what comes next in the state qualifiers.",
    date: "Oct 07, 2026",
    topics: ["Varsity Basketball", "Tournament Recap", "Team Spirit"],
    featured: false,
    listenerCount: "1.5k plays",
  },
  {
    id: 6,
    title: "Ep 23: The Great AI Debate: Can Generative Code Replace Lab Hours?",
    category: "EDUCATION",
    duration: "35 min",
    durationSeconds: 2100,
    host: "Prof. Arvind & Debate Guild",
    hostRole: "Faculty & Student Panel",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=85",
    audioUrl: "/audio/sample.mp3",
    description: "A lively roundtable debate between computer science faculty and student coders on ethics, coding copilot dependencies in freshman classes, and how grading is adapting in 2026.",
    date: "Oct 02, 2026",
    topics: ["AI in Academia", "Coding Ethics", "Faculty Perspectives"],
    featured: false,
    listenerCount: "2.8k plays",
  },
];

export const programs: Program[] = [
  {
    id: 1,
    time: "07:30 AM - 09:30 AM",
    name: "Morning Chai & Campus Vibes",
    type: "Early morning greetings, campus bus alerts & upbeat indie tracks",
    host: "Ananya Iyer",
    hostRole: "Live Morning RJ",
    day: "Monday to Friday",
    dayCategory: "WEEKDAYS",
    live: true,
    description: "Wake up with curated indie-folk, morning campus headlines, canteen breakfast specials, and lighthearted chats before your 8:30 AM lecture.",
    genre: "Indie Pop & Campus News",
  },
  {
    id: 2,
    time: "11:00 AM - 12:30 PM",
    name: "The Student Quad Debate",
    type: "Live student townhall, society announcements & hot takes",
    host: "Debate Society & Guests",
    hostRole: "Rotating Student Anchors",
    day: "Monday, Wednesday, Friday",
    dayCategory: "WEEKDAYS",
    live: false,
    description: "A mic open to student concerns: hostel amenities, placement season expectations, fest preparations, and cultural committee debates.",
    genre: "Talk & Opinions",
  },
  {
    id: 3,
    time: "02:00 PM - 03:30 PM",
    name: "Post-Lunch Vinyl & Lo-fi Chillout",
    type: "Low-tempo beats for library study sessions and quiet dorm hours",
    host: "DJ Beatsmith",
    hostRole: "Production Resident",
    day: "Monday to Friday",
    dayCategory: "WEEKDAYS",
    live: false,
    description: "Gentle instrumental beats, lo-fi hip-hop, and ambient textures designed to help you concentrate through afternoon coding or assignment deadlines.",
    genre: "Lo-Fi & Ambient Instrumental",
  },
  {
    id: 4,
    time: "04:30 PM - 06:00 PM",
    name: "Drive-Home Shoutouts & Track Requests",
    type: "Live song requests, listener voice notes & birthday dedications",
    host: "Rohan & Sneha",
    hostRole: "Evening Duo",
    day: "Monday to Saturday",
    dayCategory: "WEEKDAYS",
    live: false,
    description: "Send your song dedications, club shoutouts, and celebration messages to our live WhatsApp desk and hear them played on air.",
    genre: "Pop, Requests & Dedications",
  },
  {
    id: 5,
    time: "07:00 PM - 08:30 PM",
    name: "Unplugged on Campus",
    type: "Live acoustic performances by student musicians in Studio B",
    host: "Music Society Leads",
    hostRole: "Student Music Producers",
    day: "Saturdays & Sundays",
    dayCategory: "WEEKENDS",
    live: false,
    description: "Stripped-back guitar, soulful vocals, and original songwriting recorded in direct analog sound with student artists.",
    genre: "Acoustic, Indie & Covers",
  },
  {
    id: 6,
    time: "09:30 PM - 11:30 PM",
    name: "Midnight Owls: Storytelling & Late Night Vinyl",
    type: "Spoken word, horror stories, campus nostalgia & late night jazz",
    host: "The Night Owls Crew",
    hostRole: "Hostel Broadcast Team",
    day: "Every Night",
    dayCategory: "WEEKDAYS",
    live: false,
    description: "For the night owls, researchers, and project pullers. Mellow late-night jazz, quiet conversations, and campus folklore as the clock ticks past midnight.",
    genre: "Late Night Jazz & Spoken Word",
  },
];

export const campusShoutouts: CampusShoutout[] = [
  {
    id: 1,
    sender: "Pooja (3rd Yr CS)",
    recipient: "Hostel 3, 2nd Floor Gang",
    message: "Huge shoutout to everyone who survived the OS viva today! Group coffee run at 6 PM is on me.",
    timeAgo: "15 min ago",
    songRequest: "Feeling Good — Nina Simone",
  },
  {
    id: 2,
    sender: "Mechanical Dept Council",
    recipient: "All Freshers",
    message: "Robot Wars workshop registrations open tonight at 8 PM on the portal. Bring your safety goggles!",
    timeAgo: "42 min ago",
    songRequest: "Thunderstruck — AC/DC",
  },
  {
    id: 3,
    sender: "Karthik (Design)",
    recipient: "Sneha",
    message: "Happy 21st birthday to the most creative soul on campus! Keep shining on the evening radio slot.",
    timeAgo: "1 hr ago",
    songRequest: "Golden Hour — JVKE",
  },
];
