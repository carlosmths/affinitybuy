'use client';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PiCaretLeftBold } from 'react-icons/pi';
import { PiCaretRightBold } from 'react-icons/pi';
import { cn, remToPx } from '@/lib/utils';
import { throttle } from 'lodash';
import { useGlobalContext } from '@/contexts/global-context';
import CarouselItem from '@/components/carousel-item';

interface CarouselProps {
  elements: React.ReactNode[];
  cols?: 1 | 4 | 6;
  title?: string;
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const { elements, cols = 4, title } = props;
  const caretClasses =
    'caret-button absolute p-1 h-16 border border-gray-400 bg-white hover:bg-gray-50 top-1/2 -translate-y-1/2 -mt-1 text-erie-black rounded';
  const GAP_SIZE = 0.5;
  const MARGIN_SIZE = 1;
  const realGapSize = (GAP_SIZE * (cols - 1) + MARGIN_SIZE) / cols; // Makes elements fit perfectly in each column taking into account gap between elements.
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [showLeftCaret, setShowLeftCaret] = React.useState<boolean>(false);
  const [showRightCaret, setShowRightCaret] = React.useState<boolean>(false);
  const [scrollInterval, setScrollInterval] = React.useState<NodeJS.Timeout>();
  const [swipeTimeout, setSwipeTimeout] = React.useState<NodeJS.Timeout>();
  const [isSwiping, setIsSwiping] = React.useState<boolean>(false);
  const [isHovering, setIsHovering] = React.useState<boolean>(false);
  const { isTouchDevice } = useGlobalContext();

  const scroll = React.useCallback((scrollRight: boolean) => {
    const carousel = carouselRef.current;
    const currentSlider = sliderRef.current;

    if (currentSlider) {
      const scrollDistance = (carousel && carousel.offsetWidth + remToPx(GAP_SIZE - 2 * MARGIN_SIZE)) || 0;
      currentSlider.scrollTo({
        left: scrollRight ? currentSlider.scrollLeft + scrollDistance : currentSlider.scrollLeft - scrollDistance,
        behavior: 'smooth',
      });
    }
  }, []);

  const setCaretsVisibility = React.useCallback(
    (slider?: HTMLDivElement | null) => {
      if (isTouchDevice || !slider) return;

      const SCROLL_OFFSET = 1;
      const sliderWidth = slider.offsetWidth;
      const scrollLeft = slider.scrollLeft;
      const sliderContent = slider.querySelector<HTMLDivElement>('.slider-content');
      const sliderScrollWidth = sliderContent?.scrollWidth || 0;
      setShowLeftCaret(scrollLeft > 0);
      setShowRightCaret(scrollLeft + sliderWidth < sliderScrollWidth - SCROLL_OFFSET);
    },
    [isTouchDevice]
  );

  const handleScrollTouchDevices = () => {
    if (!isTouchDevice) return;

    clearTimeout(swipeTimeout);
    setIsSwiping(true);
    const timeout = setTimeout(() => setIsSwiping(false), 2000);
    setSwipeTimeout(timeout);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const currentSlider = event.target as HTMLDivElement;
    setCaretsVisibility(currentSlider);
    handleScrollTouchDevices();
  };

  const debouncedHandleScroll = throttle(handleScroll, 100);

  const handleMouseEnter = () => {
    scrollInterval && clearInterval(scrollInterval);
    setScrollInterval(undefined);
    if (!isTouchDevice) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovering(false);
    }
  };

  React.useEffect(() => {
    const slider = sliderRef.current;
    setCaretsVisibility(slider);
  }, [setCaretsVisibility, isTouchDevice]);

  return (
    <div
      ref={carouselRef}
      className="carousel lg:container group w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="max-lg:container flex mb-4 justify-between items-center">
        {title && <h2 className="text-xl">{title}</h2>}
      </div>
      <div className="relative">
        {showLeftCaret && (
          <button
            className={cn(caretClasses, isTouchDevice && 'hidden lg:block', '-left-0 lg:-left-3')}
            onClick={() => scroll(false)}>
            <PiCaretLeftBold />
          </button>
        )}
        {showRightCaret && (
          <button
            className={cn(caretClasses, isTouchDevice && 'hidden lg:block', '-right-0 lg:-right-3')}
            onClick={() => scroll(true)}>
            <PiCaretRightBold />
          </button>
        )}
        <div
          ref={sliderRef}
          className={cn(
            'slider overflow-x-scroll flex',
            isTouchDevice && !isSwiping && 'no-scrollbar',
            !isTouchDevice && !isHovering && 'no-scrollbar'
          )}
          onScroll={debouncedHandleScroll}>
          <div className="slider-content flex grow max-lg:mx-4 gap-x-2">
            {elements.map((element) => (
              <CarouselItem key={uuidv4()} cols={cols} gap={realGapSize} element={element} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
