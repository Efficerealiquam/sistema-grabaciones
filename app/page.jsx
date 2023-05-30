import Nav from "@/components/Nav";
import Section_Home from "@/components/Section_Home";
import Sidebar from "@/components/Sidebar";
import BottomBar from '@/components/BottomBar';

const Home = () => {
  return (
    <div className="w-full flex-center flex-col" style={{background:"#fff"}} >
      <Nav />
      <div className=" w-full flex">
        <Sidebar />
        <Section_Home />
        <BottomBar  />
      </div>
    </div>
  );
};

export default Home;
