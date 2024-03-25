import Carousel from "./components/Carousel";
import Recent from "./components/Recent";
import Aboutus from "./components/Aboutus";
import CommunityHome from "./components/CommunityHome";
import Curations from "./components/Curations";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div>
      <Carousel />
      <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
      <Recent />
      <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
      <Aboutus />
      <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
      <Curations />
      <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
      <CommunityHome />
      <Footer />
    </div>
  );
};

export default Home;
