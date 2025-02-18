import React, { useState } from 'react';
import { Camera, Satellite, Video, Instagram, UserCheck, Clock, CreditCard, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceProps {
  icon: React.ElementType;
  title: string;
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard: React.FC<ServiceProps> = ({ icon: Icon, title, description, isExpanded, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className={cn(
        "w-full text-left p-6 rounded-xl transition-all duration-200",
        "group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        isExpanded ? "bg-gray-50 shadow-sm" : "bg-white hover:bg-gray-50",
        "md:bg-white md:hover:bg-gray-50 md:hover:shadow-md md:h-full"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg text-gray-900">{title}</h3>
          <div 
            className={cn(
              "mt-2 text-gray-600 text-sm transition-all duration-200 overflow-hidden",
              "md:block md:max-h-none md:opacity-100", // Always show on desktop
              isExpanded 
                ? "max-h-48 opacity-100" 
                : "max-h-0 opacity-0"
            )}
          >
            {description}
          </div>
        </div>
      </div>
    </button>
  );
};

const ServicesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: Camera,
      title: "Professional Photography",
      description: "High-quality, professionally edited real estate photography that showcases properties at their best."
    },
    {
      id: 2,
      icon: Satellite, // Using Satellite instead of Drone as per Lucide availability
      title: "Aerial Coverage",
      description: "FAA-certified operators capturing stunning aerial views and property surroundings."
    },
    {
      id: 3,
      icon: Video,
      title: "Video Production",
      description: "Cinematic property tours and promotional videos that tell your property's unique story."
    },
    {
      id: 4,
      icon: Instagram,
      title: "Social Media Content",
      description: "Engaging content optimized for all major social platforms and marketing channels."
    },
    {
      id: 5,
      icon: UserCheck,
      title: "Verified Creators",
      description: "Every creator is thoroughly vetted and verified for quality and professionalism."
    },
    {
      id: 6,
      icon: Clock,
      title: "24/7 Availability",
      description: "Book creators any time, with flexible scheduling to meet your deadlines."
    },
    {
      id: 7,
      icon: CreditCard,
      title: "Transparent Pricing",
      description: "Clear, upfront pricing with no hidden fees. Pay only for what you need."
    },
    {
      id: 8,
      icon: Award,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all content. Your property deserves the best."
    }
  ];

  return (
    <section className="py-16 px-4 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Professional Content Creation Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to showcase your properties with stunning visuals and engaging content
          </p>
        </div>

        {/* Desktop Layout - Always expanded */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              isExpanded={true}
              onToggle={() => {}}
            />
          ))}
        </div>

        {/* Mobile Layout - Expandable */}
        <div className="md:hidden space-y-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              isExpanded={expandedId === service.id}
              onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
