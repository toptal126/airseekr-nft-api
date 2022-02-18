import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Arena = () => {
  return (
    <div className="container flex flex-col lg:flex-row fade-in max-w-none">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Arena;
