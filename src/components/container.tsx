import classNames from 'classnames';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={classNames('container mx-auto px-4 py-16 max-w-screen-2xl', className)}>{children}</div>;
}
