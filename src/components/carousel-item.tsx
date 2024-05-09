import { cn } from '@/lib/utils';

interface CarouselItemProps {
  cols: number;
  gap: number;
  element: React.ReactNode;
  className?: string;
}

const CarouselItem: React.FC<CarouselItemProps> = (props) => {
  const { cols, gap, element, className } = props;

  return (
    <div
      className={cn('flex shrink-0 min-w-36', className)}
      style={{ width: `calc(var(--space-inner-container) / ${cols} - ${gap}rem)` }}>
      {element}
    </div>
  );
};

export default CarouselItem;
