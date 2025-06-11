
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "@/icons";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael Thompson",
      role: "Property Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      review: "The quality of content from Luxe Content Connect has completely transformed our marketing approach. Their team consistently delivers stunning visuals that capture the essence of our properties.",
      rating: 5,
      highlight: "transformed our marketing approach"
    },
    {
      name: "Sarah Martinez",
      role: "Real Estate Agent",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      review: "Working with this platform has been a game-changer for my listings. The professional photos and virtual tours help my properties stand out in a competitive market.",
      rating: 5,
      highlight: "game-changer for my listings"
    },
    {
      name: "David Chen",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      review: "As a photographer, this platform has connected me with amazing clients. The streamlined booking process and clear communication make everything effortless.",
      rating: 5,
      highlight: "streamlined booking process"
    },
    {
      name: "Emily Wright",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      review: "The consistency and quality of content we receive is outstanding. Our properties receive more engagement and inquiries thanks to the professional presentation.",
      rating: 5,
      highlight: "more engagement and inquiries"
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold">
          What Our Community Says
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-lg">
          Join thousands of satisfied professionals who trust our platform
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-secondary/50 border-0 h-full transition-all duration-300 hover:bg-secondary">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/10"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5">
                          <Star className="w-4 h-4 fill-white text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{testimonial.name}</h3>
                        <p className="text-muted-foreground text-base">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>

                    <p className="text-muted-foreground text-base leading-relaxed">
                      {testimonial.review.split(testimonial.highlight).map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="font-medium text-foreground">
                              {testimonial.highlight}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="relative static translate-y-0 h-9 w-9" />
            <CarouselNext className="relative static translate-y-0 h-9 w-9" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
