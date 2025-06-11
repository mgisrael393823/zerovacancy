
import { Check, Camera, Plane, Video, Users, Clock, Award } from '@/icons';
import { cn } from "@/lib/utils";
import { ColorVariant } from './PricingCardColors';

interface PricingFeaturesListProps {
  features: string[];
  colorAccent: string;
  tierColor?: ColorVariant;
  isMobile?: boolean;
  useColumns?: boolean;
}

export const PricingFeaturesList = ({ 
  features, 
  colorAccent, 
  tierColor = "blue",
  isMobile = false,
  useColumns = false
}: PricingFeaturesListProps) => {
  const getIcon = (feature: string) => {
    if (isMobile) {
      return <Check size={12} />; // Smaller icons on mobile
    }
    
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('photo')) return <Camera size={18} />;
    if (lowerFeature.includes('drone') || lowerFeature.includes('aerial')) return <Plane size={18} />;
    if (lowerFeature.includes('video')) return <Video size={18} />;
    if (lowerFeature.includes('social')) return <Users size={18} />;
    if (lowerFeature.includes('turnaround') || lowerFeature.includes('delivery')) return <Clock size={18} />;
    if (lowerFeature.includes('premium') || lowerFeature.includes('advanced')) return <Award size={18} />;
    return <Check size={18} />;
  };

  // Group features for better organization on mobile
  const groupFeatures = () => {
    if (!useColumns) return { all: features };
    
    // For mobile, separate into two columns for better visual organization
    const midpoint = Math.ceil(features.length / 2);
    return {
      column1: features.slice(0, midpoint),
      column2: features.slice(midpoint)
    };
  };
  
  const grouped = groupFeatures();

  if (useColumns) {
    return (
      <div className="flex flex-wrap -mx-1">
        <div className="w-1/2 px-1 mb-2">
          <ul className="space-y-1.5">
            {grouped.column1.map(feature => (
              <li key={feature} className="flex items-start">
                <span className={cn("flex-shrink-0 mr-1 mt-0.5", colorAccent)}>
                  {getIcon(feature)}
                </span>
                <span className={cn(
                  feature.includes("plus:") ? `font-medium ${colorAccent}` : "",
                  isMobile ? "text-[10px] leading-tight" : "text-xs"
                )}>
                  {feature.replace("plus:", "")}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="w-1/2 px-1">
          <ul className="space-y-1.5">
            {grouped.column2.map(feature => (
              <li key={feature} className="flex items-start">
                <span className={cn("flex-shrink-0 mr-1 mt-0.5", colorAccent)}>
                  {getIcon(feature)}
                </span>
                <span className={cn(
                  feature.includes("plus:") ? `font-medium ${colorAccent}` : "",
                  isMobile ? "text-[10px] leading-tight" : "text-xs"
                )}>
                  {feature.replace("plus:", "")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <ul className={cn(
      "text-brand-text-primary",
      isMobile ? "space-y-1.5 text-[10px]" : "space-y-4 text-sm"
    )}>
      {features.map(feature => (
        <li key={feature} className="flex items-start">
          <span className={cn(
            "flex-shrink-0 mr-2 mt-0.5", 
            colorAccent,
            isMobile ? "w-3 h-3" : "w-5 h-5"
          )}>
            {getIcon(feature)}
          </span>
          <span className={feature.includes("plus:") ? `font-medium ${colorAccent}` : ""}>
            {feature.replace("plus:", "")}
          </span>
        </li>
      ))}
    </ul>
  );
};
