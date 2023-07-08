import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/common/NavBar";
import MainHeader from "@/components/common/MainHeader";

const MainLayout = () => {
  return (
    <div>
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
};

export default MainLayout;
