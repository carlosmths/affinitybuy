'use client';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PiCaretLeftBold } from 'react-icons/pi';
import { PiCaretRightBold } from 'react-icons/pi';
import { cn, remToPx } from '@/lib/utils';
import { GoDotFill } from 'react-icons/go';
import { throttle } from 'lodash';

interface CarouselProps {
  elements: React.ReactNode[];
  cols?: 1 | 4 | 6;
  title?: string;
  variant?: 'default' | 'hero';
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const { elements, cols = 4, title, variant = 'default' } = props;
  const slidesNumber = Math.ceil(elements.length / cols);
  const caretClasses =
    'caret-button absolute rounded-full p-3 border border-gray-400 bg-white hover:bg-gray-50 top-1/2 -translate-y-1/2 -mt-1 text-erie-black';
  const isHero = variant === 'hero';
  const realGapSize = (0.5 * (cols - 1)) / cols; // Makes elements fit perfectly in each column taking into account gap between elements.
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [slides] = React.useState<string[]>([...Array(slidesNumber)].map(() => uuidv4()));
  const [showLeftCaret, setShowLeftCaret] = React.useState<boolean>(false);
  const [showRightCaret, setShowRightCaret] = React.useState<boolean>(false);
  const [activeSlide, setActiveSlide] = React.useState<string>(slides[0]);
  const [prevScrollLeftPos, setPrevScrollLeftPos] = React.useState<number>(0);
  const [scrollInterval, setScrollInterval] = React.useState<NodeJS.Timeout>();
  const [items, setItems] = React.useState<React.ReactNode[]>(elements);

  const shiftElements = React.useCallback(
    (scrollRight: boolean) => {
      const itemsCopy = [...items];
      if (scrollRight) {
        const firstElement = itemsCopy.shift();
        setItems([...itemsCopy, firstElement]);
      } else {
        const lastElement = itemsCopy.pop();
        setItems([lastElement, ...itemsCopy]);
      }
    },
    [items]
  );

  const scroll = React.useCallback(
    (scrollRight: boolean) => {
      const carousel = carouselRef.current;
      const currentSlider = sliderRef.current;
      if (currentSlider) {
        const scrollDistance = (carousel && carousel.offsetWidth + remToPx(0.5)) || 0;
        currentSlider.scrollTo({
          left: scrollRight ? currentSlider.scrollLeft + scrollDistance : currentSlider.scrollLeft - scrollDistance,
          behavior: 'smooth',
        });
      }
      if (isHero) {
        shiftElements(scrollRight);
      }
    },
    [isHero, shiftElements]
  );

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const currentSlider = event.target as HTMLDivElement;
    const sliderWidth = currentSlider.offsetWidth;
    const scrollLeft = currentSlider.scrollLeft;
    const sliderContent = currentSlider.querySelector<HTMLDivElement>('.slider-content');
    const sliderScrollWidth = sliderContent?.scrollWidth || 0;
    let currentSlideIndex = 0;
    if (scrollLeft === 0) {
      currentSlideIndex = 0;
    } else if (scrollLeft + sliderWidth === sliderScrollWidth) {
      currentSlideIndex = slidesNumber - 1;
    } else {
      const slide = Math.floor((scrollLeft + sliderWidth) / sliderWidth);
      currentSlideIndex = prevScrollLeftPos <= scrollLeft ? slide - 1 : slide;
    }
    setShowLeftCaret(isHero || scrollLeft > 0);
    setShowRightCaret(isHero || scrollLeft + sliderWidth < sliderScrollWidth);
    setPrevScrollLeftPos(scrollLeft);
    setActiveSlide(slides[currentSlideIndex]);
  };

  const debouncedHandleScroll = throttle(handleScroll, 50);

  const getAutoScrollInterval = React.useCallback(() => {
    if (items.length <= 1) {
      return undefined;
    }
    return setInterval(() => scroll(true), 4000);
  }, [items, scroll]);

  const handleMouseEnter = () => {
    scrollInterval && clearInterval(scrollInterval);
    setScrollInterval(undefined);
  };

  const handleMouseLeave = () => {
    if (isHero) {
      const interval = getAutoScrollInterval();
      setScrollInterval(interval);
    }
  };

  React.useEffect(() => {
    const carousel = carouselRef.current;
    const slider = sliderRef.current;
    const scrollLeft = carousel?.scrollLeft || 0;
    const sliderContent = carousel?.querySelector<HTMLDivElement>('.slider-content');
    const sliderWidth = slider?.offsetWidth || 0;
    const sliderScrollWidth = sliderContent?.scrollWidth || 0;
    setShowLeftCaret(isHero || scrollLeft > 0);
    setShowRightCaret(isHero || scrollLeft + sliderWidth < sliderScrollWidth);
    if (isHero) {
      const interval = getAutoScrollInterval();
      setScrollInterval(interval);
      return () => clearInterval(interval);
    }
  }, [getAutoScrollInterval, isHero]);

  return (
    <div
      ref={carouselRef}
      className="carousel group w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="flex mb-4 justify-between items-center">
        {title && <h2 className="text-xl">{title}</h2>}
        <div className="flex self-end ml-auto text-gray-300">
          {slides.map((slide) => {
            console.log('activeSlide', activeSlide, slide);
            return <GoDotFill key={slide} className={cn('h-3 w-3', activeSlide === slide && 'text-erie-black')} />;
          })}
        </div>
      </div>
      <div className="relative">
        {showLeftCaret && (
          <button
            className={cn(
              caretClasses,
              '-left-5',
              isHero && 'rounded-r-full rounded-l-none -left-0 hidden group-hover:block'
            )}
            onClick={() => scroll(false)}>
            <PiCaretLeftBold />
          </button>
        )}
        {showRightCaret && (
          <button
            className={cn(
              caretClasses,
              '-right-5',
              isHero && 'rounded-l-full rounded-r-none -right-0 hidden group-hover:block'
            )}
            onClick={() => scroll(true)}>
            <PiCaretRightBold />
          </button>
        )}
        <div ref={sliderRef} className="slider overflow-scroll no-scrollbar" onScroll={debouncedHandleScroll}>
          <div className="slider-content flex w-full gap-x-2">
            {items.map((element) => (
              <div
                key={uuidv4()}
                className={cn('flex shrink-0 min-w-36', isHero && 'h-96')}
                style={{ width: `calc(100%/${cols} - ${realGapSize}rem)` }}>
                {element}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
