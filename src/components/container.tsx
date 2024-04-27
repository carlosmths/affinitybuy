import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { children, className } = props;
  return <div className={cn('container mx-auto px-4 py-16 max-w-screen-2xl', className)}>{children}</div>;
};

export default Container;
