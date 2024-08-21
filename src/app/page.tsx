import Container from '@/components/container';
import HeroCarousel from '@/components/hero-carousel';
import RegularCarousel from '@/components/regular-carousel';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const randomElements = [...Array(27)].map((_, index) => (
    <div key={uuidv4()} className="bg-white rounded-lg w-full min-h-44">
      {index}
    </div>
  ));
  return (
    <main>
      <HeroCarousel
        elements={[
          <Image key={uuidv4()} src="/image1.jpg" width={3000} height={1200} alt={''} />,
          <Image key={uuidv4()} src="/image2.jpg" width={3000} height={1200} alt={''} />,
          <Image key={uuidv4()} src="/image3.jpg" width={3000} height={1200} alt={''} />,
          <Image key={uuidv4()} src="/image4.jpg" width={3000} height={1200} alt={''} />,
          <Image key={uuidv4()} src="/image5.jpg" width={3000} height={1200} alt={''} />,
        ]}
      />
      <Container>
        <RegularCarousel elements={randomElements} cols={6} title="This is a title" />
      </Container>
    </main>
  );
};

export default Home;
