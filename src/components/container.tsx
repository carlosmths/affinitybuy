import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { children, className, fullWidth } = props;
  return (
    <div className={cn('container mx-auto px-4 py-16 max-w-6xl', fullWidth && 'p-0 max-w-full-hd', className)}>
      {children}
    </div>
  );
};

export default Container;
