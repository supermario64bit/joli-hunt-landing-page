// Mock data for JoliHunt landing page

export const problemCards = [
  {
    id: 1,
    icon: "FileSpreadsheet",
    title: "Lost in spreadsheets",
    description: "Rows of jobs with no clear status or next step. You spend more time updating cells than applying."
  },
  {
    id: 2,
    icon: "CalendarX",
    title: "Missed interview dates",
    description: "You forgot to follow up, missed the window. Opportunities slipped through the cracks."
  },
  {
    id: 3,
    icon: "HelpCircle",
    title: "No idea where you stand",
    description: "Applied to 30 jobs, heard back from 3. Which companies are still reviewing? Who knows."
  }
];

export const features = [
  {
    id: 1,
    title: "Track Every Application",
    description: "See all your applications at a glance. Know exactly how many are active, in screening, or waiting for your response.",
    position: "left",
    mockupType: "stats"
  },
  {
    id: 2,
    title: "Never Miss an Interview",
    description: "Get a clear view of upcoming interviews with visual reminders. TODAY badges keep you prepared and on time.",
    position: "right",
    mockupType: "interviews"
  },
  {
    id: 3,
    title: "See Your Pipeline at a Glance",
    description: "Visualize your entire job search journey. Watch applications flow from initial contact to final offer.",
    position: "left",
    mockupType: "pipeline"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Designer",
    avatar: "SC",
    quote: "JoliHunt turned my chaotic job search into a clear process. I landed 3 offers in 6 weeks.",
    color: "#D4A017"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Software Engineer",
    avatar: "MJ",
    quote: "Finally, a tool that actually helps. No more forgetting which company I applied to last week.",
    color: "#D4A017"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Marketing Manager",
    avatar: "PP",
    quote: "The interview tracker saved me. I used to miss follow-ups constantly. Now I'm on top of everything.",
    color: "#D4A017"
  }
];

export const steps = [
  {
    id: 1,
    number: "01",
    title: "Add your applications",
    description: "Import or manually add job applications with all the details that matter."
  },
  {
    id: 2,
    number: "02",
    title: "Track interviews and deadlines",
    description: "Stay on top of every interview, follow-up, and deadline in one organized view."
  },
  {
    id: 3,
    number: "03",
    title: "Land the offer",
    description: "Make better decisions with clear insights into your entire job search pipeline."
  }
];

export const navLinks = [
  { id: "features", label: "Features", href: "#features" },
  { id: "how-it-works", label: "How It Works", href: "#how-it-works" },
  { id: "testimonials", label: "Testimonials", href: "#testimonials" },
  { id: "contact", label: "Contact", href: "#contact" }
];

export const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" }
];

export const statsData = [
  { label: "Total Active", value: "42", color: "#D4A017" },
  { label: "Applied", value: "28", color: "#6B6B6B" },
  { label: "Scheduled", value: "8", color: "#10B981" },
  { label: "Offers", value: "3", color: "#D4A017" }
];

export const upcomingInterviews = [
  { company: "TechCorp", role: "Senior Designer", date: "Today", time: "2:00 PM", badge: "TODAY" },
  { company: "StartupXYZ", role: "Product Lead", date: "Tomorrow", time: "10:30 AM", badge: null },
  { company: "BigCompany", role: "UX Manager", date: "Dec 20", time: "3:00 PM", badge: null }
];
