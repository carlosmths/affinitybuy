import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { children, className, fullWidth } = props;
  return <div className={cn('container py-16', fullWidth && 'p-0 max-w-full-hd', className)}>{children}</div>;
};

export default Container;
