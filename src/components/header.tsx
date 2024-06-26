import Container from '@/components/container';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-erie-black">
      <Container className="py-4">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Site logo" width="200" height="100" />
        </div>
      </Container>
    </header>
  );
};

export default Header;
