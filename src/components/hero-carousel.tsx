'use client';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn-ui/carousel';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

interface HeroCarouselProps {
  elements: React.ReactNode[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = (props) => {
  const { elements } = props;
  const caretClasses =
    'p-1 h-16 border border-gray-400 bg-white hover:bg-gray-50 top-1/4 text-erie-black rounded hidden lg:group-hover:inline-flex z-10';

  return (
    <Carousel
      className="group"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}>
      <CarouselDots className="absolute z-10 bottom-1/3 left-1/2 -translate-x-1/2" />
      <CarouselContent>
        {elements.map((element, index) => (
          <CarouselItem key={index} className="pl-0">
            <div className="flex items-start justify-center">{element}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={cn(caretClasses, 'left-0')} />
      <CarouselNext className={cn(caretClasses, 'right-0')} />
    </Carousel>
  );
};

export default HeroCarousel;
