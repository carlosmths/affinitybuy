import Carousel from '@/components/carousel';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const randomElements = [...Array(27)].map((_, index) => (
    <div key={uuidv4()} className="bg-white rounded-lg w-full min-h-44">
      {index}
    </div>
  ));
  return (
    <main>
      <Carousel elements={randomElements} cols={6} title="This is a title" />
    </main>
  );
};

export default Home;
