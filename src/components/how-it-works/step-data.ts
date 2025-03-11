
import { Search, Users2, CalendarDays, FileCheck2 } from 'lucide-react';
import { Step } from './types';

// Define step data to avoid repetition
export const steps: Step[] = [
  {
    icon: Search,
    title: "DISCOVER",
    description: "Explore our curated network of visionaries whose lenses and perspectives reshape how people experience spaces.",
    number: "01",
    iconClass: "text-violet-600 bg-violet-50",
    numberClass: "bg-violet-600 text-white",
    borderClass: "border-violet-200",
    gradientClass: "bg-gradient-to-r from-violet-600 to-purple-600 text-white",
    gradientFrom: "#8B5CF6", 
    gradientTo: "#6D28D9",
    gradientDirection: "135deg",
    gradientStyle: {
      background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
    },
    tips: "Filter creators by specialty, style, and location to find your perfect match."
  },
  {
    icon: Users2,
    title: "CONNECT",
    description: "Immerse yourself in creative portfolios that reveal each creator's unique perspective on architectural storytelling.",
    number: "02",
    iconClass: "text-blue-600 bg-blue-50",
    numberClass: "bg-blue-600 text-white",
    borderClass: "border-blue-200",
    gradientClass: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
    gradientFrom: "#2563EB", 
    gradientTo: "#4F46E5",
    gradientDirection: "135deg",
    gradientStyle: {
      background: "linear-gradient(135deg, #2563EB, #4F46E5)",
    },
    tips: "Schedule a consultation directly through our platform to discuss your vision."
  },
  {
    icon: CalendarDays,
    title: "COLLABORATE",
    description: "Lock in your vision with transparent investment structures. Your creative capital remains in escrow until your vision materializes.",
    number: "03",
    iconClass: "text-amber-600 bg-amber-50",
    numberClass: "bg-amber-600 text-white",
    borderClass: "border-amber-200",
    gradientClass: "bg-gradient-to-r from-amber-500 to-orange-600 text-white",
    gradientFrom: "#F59E0B", 
    gradientTo: "#EA580C",
    gradientDirection: "135deg",
    gradientStyle: {
      background: "linear-gradient(135deg, #F59E0B, #EA580C)",
    },
    tips: "Our secure platform handles payments and project milestones for peace of mind."
  },
  {
    icon: FileCheck2,
    title: "TRANSFORM",
    description: "Receive visual assets that transcend traditional property marketing and create emotional connections with your ideal audience.",
    number: "04",
    iconClass: "text-emerald-600 bg-emerald-50",
    numberClass: "bg-emerald-600 text-white",
    borderClass: "border-emerald-200",
    gradientClass: "bg-gradient-to-r from-emerald-500 to-green-600 text-white",
    gradientFrom: "#10B981", 
    gradientTo: "#059669",
    gradientDirection: "135deg",
    gradientStyle: {
      background: "linear-gradient(135deg, #10B981, #059669)",
    },
    tips: "Download and use your premium assets across all your marketing channels."
  }
];
