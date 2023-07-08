import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/common/NavBar";

const SubLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
};
export default SubLayout;
