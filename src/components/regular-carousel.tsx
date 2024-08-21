'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Carousel,
  CarouselApi,
  CarouselDots,
} from '@/components/shadcn-ui/carousel';

interface CarouselProps {
  elements: React.ReactNode[];
  cols?: 2 | 4 | 6;
  title?: string;
}

const RegularCarousel: React.FC<CarouselProps> = (props) => {
  const { elements, cols = 6, title } = props;
  const caretClasses =
    'hidden lg:block caret-button absolute p-1 h-16 w-6 border border-gray-400 bg-white hover:bg-gray-50 top-1/2 -translate-y-1/2 -mt-1 text-erie-black rounded';
  const [emblaApi, setEmblaApi] = React.useState<CarouselApi>();

  const scrollPrev = () => {
    if (!emblaApi) return;
    emblaApi.scrollTo(emblaApi.selectedScrollSnap() - cols);
  };

  const scrollNext = () => {
    if (!emblaApi) return;
    emblaApi.scrollTo(emblaApi.selectedScrollSnap() + cols);
  };

  return (
    <Carousel
      setApi={setEmblaApi}
      className="group"
      opts={{ dragFree: true, align: 'start' }}
      cols={cols}
      hideArrowsOnScrollEnd>
      <div className="max-lg:container flex mb-4 justify-between items-center">
        {title && <h2 className="text-xl">{title}</h2>}
        <CarouselDots />
      </div>
      <div className="relative">
        <CarouselContent className="-ml-2">
          {elements.map((element, index) => (
            <CarouselItem key={index} className={`pl-2 min-w-40`} style={{ flexBasis: `${100 / cols}%` }}>
              <div>{element}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn(caretClasses, 'left-0')} onClick={scrollPrev} />
        <CarouselNext className={cn(caretClasses, 'right-0')} onClick={scrollNext} />
      </div>
    </Carousel>
  );
};

export default RegularCarousel;
