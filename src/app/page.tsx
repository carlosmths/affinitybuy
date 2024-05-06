import Carousel from '@/components/carousel';
import Container from '@/components/container';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const randomElements = [...Array(4)].map((_, index) => (
    <div key={uuidv4()} className="bg-white rounded-lg w-full min-h-44">
      {uuidv4()}
    </div>
  ));
  return (
    <main>
      <Container className="py-0" fullWidth>
        <Carousel elements={randomElements} cols={1} variant="hero" title="This is a title" />
      </Container>
    </main>
  );
};

export default Home;
