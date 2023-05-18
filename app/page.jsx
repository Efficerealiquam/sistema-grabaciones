import Nav from "@/components/Nav";
import Section_Home from "@/components/Section_Home";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  return (
    <div className="w-full flex-center flex-col">
      <Nav />
      <div className=" w-full flex">
        <Sidebar />
        <Section_Home />
      </div>
    </div>
  );
};

export default Home;
