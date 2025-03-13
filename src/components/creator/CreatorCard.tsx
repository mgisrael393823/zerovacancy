import React, { useState, useCallback } from 'react';
import { Card } from '../ui/card';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorRating } from './CreatorRating';
import { GlowDialog } from '../ui/glow-dialog';
import { BorderBeam } from '../ui/border-beam';
import { CreatorMedia } from './CreatorMedia';
import { PortfolioPreview } from './PortfolioPreview';
import type { CreatorCardProps } from './types';

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef 
}) => {
  const isMobile = useIsMobile();
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const [stage, setStage] = useState<'initial' | 'input' | 'confirmed'>('initial');

  const handleCTAClick = useCallback(() => {
    setShowGlowDialog(true);
  }, []);

  return (
    <>
      <article className="group select-text h-full">
        <div className="relative h-full">
          {isMobile ? (
            <Card className={cn(
              "overflow-hidden h-full flex flex-col w-full",
              "bg-white border-2 border-purple-200",
              "shadow-[0_5px_16px_rgba(138,79,255,0.2)]",
              "rounded-xl relative"
            )}>
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#8A4FFF_1px,transparent_1px)] bg-[length:16px_16px] z-0 pointer-events-none"></div>
              
              <div className="absolute top-3 right-3 z-20">
                <span className="px-2 py-1 text-xs font-semibold bg-white shadow-sm border border-gray-100 text-gray-900 rounded-full">
                  From ${creator.price}
                </span>
              </div>

              <div className="aspect-[16/9] relative w-full overflow-hidden flex-shrink-0">
                <CreatorMedia 
                  creator={creator}
                  onImageLoad={onImageLoad}
                  onVideoLoad={() => onImageLoad?.(creator.image)}
                />
              </div>

              <div className="w-full px-4 py-4 flex flex-col flex-grow relative z-10">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-[15px] leading-tight">{creator.name}</h3>
                  <p className="text-sm text-gray-500 font-light mt-0.5">{creator.location}</p>
                  <p className="text-xs text-gray-600 mt-1.5">{creator.services.join(" • ")}</p>
                </div>
                
                <div className="mb-3">
                  <CreatorRating 
                    rating={creator.rating} 
                    reviews={creator.reviews} 
                    name={creator.name} 
                    availabilityStatus={creator.availabilityStatus}
                  />
                </div>

                <div className="mb-4">
                  <PortfolioPreview 
                    workExamples={creator.workExamples}
                    creatorName={creator.name}
                  />
                </div>

                <div className="flex-grow"></div>

                <div className="mt-1">
                  <button 
                    onClick={handleCTAClick}
                    aria-label={`Join waitlist for ${creator.name}`}
                    className="w-full flex items-center justify-center text-sm px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {stage === 'initial' ? (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                      </>
                    ) : stage === 'input' ? (
                      <span>Get Early Access</span>
                    ) : (
                      <span>Waitlist Joined!</span>
                    )}
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <>
              <div className="absolute -inset-0.5 sm:-inset-0.5 rounded-xl bg-gradient-to-r from-purple-800/30 via-indigo-700/30 to-purple-900/30 opacity-60 sm:opacity-75 blur-[2px] sm:blur-sm group-hover:opacity-100 transition duration-500"></div>
              <Card className={cn(
                "overflow-hidden h-full flex flex-col",
                "will-change-transform transition-all duration-300",
                "hover:translate-y-[-2px]",
                "bg-gradient-to-b from-[#f9f8fe] to-[#f5f3ff] border border-purple-200/80",
                "shadow-[0_6px_16px_rgba(138,79,255,0.08)]",
                "hover:shadow-[0_16px_32px_rgba(138,79,255,0.15)]",
                "rounded-xl relative"
              )}>
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8A4FFF_1px,transparent_1px)] bg-[length:20px_20px] z-0 pointer-events-none"></div>
                
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
                  <BorderBeam 
                    colorFrom="#9370DB" 
                    colorTo="#C19EF9" 
                    duration={20}
                    borderWidth={1.5}
                  />
                </div>

                <div className="absolute top-3.5 right-3.5 z-20">
                  <span className="px-3 py-1.5 text-sm font-semibold bg-white/90 shadow-md border border-white/40 text-[#212121] rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.12)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_4px_10px_rgba(0,0,0,0.18)]">
                    From ${creator.price}
                  </span>
                </div>

                <div className="aspect-[4/3] relative w-full overflow-hidden flex-shrink-0">
                  <CreatorMedia 
                    creator={creator}
                    onImageLoad={onImageLoad}
                    onVideoLoad={() => onImageLoad?.(creator.image)}
                  />
                </div>

                <div className="px-5 pt-5 pb-6 flex flex-col flex-grow relative z-10">
                  <div className="mb-3.5">
                    <h3 className="font-semibold text-gray-800 text-lg leading-tight">{creator.name}</h3>
                    <p className="text-sm text-gray-500 font-light mt-0.5">{creator.location}</p>
                    <p className="text-xs text-gray-600 mt-1.5 tracking-wide">{creator.services.join(" • ")}</p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <CreatorRating 
                      rating={creator.rating} 
                      reviews={creator.reviews} 
                      name={creator.name} 
                      availabilityStatus={creator.availabilityStatus}
                    />
                  </div>

                  <div className="mb-4">
                    <PortfolioPreview 
                      workExamples={creator.workExamples}
                      creatorName={creator.name}
                    />
                  </div>

                  <div className="flex-grow"></div>

                  <div className="mt-1">
                    <button 
                      onClick={handleCTAClick}
                      aria-label={`Get priority access to ${creator.name}`}
                      className={cn(
                        "w-full h-11 text-sm px-5 py-3",
                        "bg-gradient-to-r from-indigo-600 to-purple-600",
                        "text-white font-medium rounded-lg",
                        "border border-indigo-400/30 shadow-lg shadow-indigo-500/20",
                        "flex items-center justify-center transition-all duration-200",
                        "hover:shadow-xl hover:shadow-indigo-500/30"
                      )}
                    >
                      {stage === 'initial' ? (
                        <>
                          <span>Get Priority Access</span>
                          <ArrowRight className="w-4 h-4 ml-2 inline-flex" aria-hidden="true" />
                        </>
                      ) : stage === 'input' ? (
                        <span>Join Creator Waitlist</span>
                      ) : (
                        <span>Reserved for Launch!</span>
                      )}
                    </button>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </article>
      
      <GlowDialog 
        open={showGlowDialog} 
        onOpenChange={setShowGlowDialog}
      />
    </>
  );
};
