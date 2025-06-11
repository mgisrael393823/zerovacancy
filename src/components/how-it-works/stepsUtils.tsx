
import React from 'react';
import { Search, Users, FileCheck, Calendar } from '@/icons';

// Define colorful backgrounds for each step with enhanced styling options
export const stepColors = [{
  iconBg: "bg-violet-100",
  iconText: "text-violet-600",
  numBg: "bg-violet-600",
  numText: "text-white",
  lineColor: "from-violet-600/70 to-blue-500/50",
  borderColor: "border-violet-600",
  glowColor: "shadow-violet-500/20",
  tintBg: "bg-violet-50/10",
  gradient: "bg-gradient-to-br from-violet-50 to-violet-100"
}, {
  iconBg: "bg-blue-100",
  iconText: "text-blue-500",
  numBg: "bg-blue-500",
  numText: "text-white",
  lineColor: "from-blue-500/70 to-amber-600/50",
  borderColor: "border-blue-500",
  glowColor: "shadow-blue-500/20",
  tintBg: "bg-blue-50/10",
  gradient: "bg-gradient-to-br from-blue-50 to-blue-100"
}, {
  iconBg: "bg-amber-100",
  iconText: "text-amber-600",
  numBg: "bg-amber-600",
  numText: "text-white",
  lineColor: "from-amber-600/70 to-emerald-600/50",
  borderColor: "border-amber-600",
  glowColor: "shadow-amber-500/20",
  tintBg: "bg-amber-50/10",
  gradient: "bg-gradient-to-br from-amber-50 to-amber-100"
}, {
  iconBg: "bg-emerald-100",
  iconText: "text-emerald-600",
  numBg: "bg-emerald-600",
  numText: "text-white",
  lineColor: "from-emerald-600/50 to-emerald-600/10",
  borderColor: "border-emerald-600",
  glowColor: "shadow-emerald-500/20",
  tintBg: "bg-emerald-50/10",
  gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100"
}];

// Define steps data 
export const stepsData = [{
  icon: <Search className="w-5 h-5" />,
  title: "Search & Filter",
  description: "Find your perfect creator match based on your specific needs and requirements",
  number: "01",
  iconText: "text-violet-600"
}, {
  icon: <Users className="w-5 h-5" />,
  title: "Review & Compare",
  description: "Browse portfolios and reviews to find the perfect match for your project",
  number: "02",
  iconText: "text-blue-500"
}, {
  icon: <Calendar className="w-5 h-5" />,
  title: "Book & Pay",
  description: "Schedule securely through our platform with protected payments",
  number: "03",
  iconText: "text-amber-600"
}, {
  icon: <FileCheck className="w-5 h-5" />,
  title: "Get Content",
  description: "Receive and approve your deliverables through our streamlined process",
  number: "04",
  iconText: "text-emerald-600"
}];

export interface StepStyle {
  iconBg: string;
  iconText: string;
  numBg: string;
  numText: string;
  lineColor: string;
  borderColor: string;
  glowColor: string;
  tintBg: string;
  gradient: string;
}

export interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
  iconText?: string; // Added this missing property
}
