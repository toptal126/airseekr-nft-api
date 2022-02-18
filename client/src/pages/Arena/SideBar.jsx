import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="arena-nav">
      <NavLink to="doa" className="arena-nav-item">
        Dead or Alive
      </NavLink>
      <NavLink to="leaderboard" className="arena-nav-item">
        Top Notch
      </NavLink>
      <NavLink to="records" className="arena-nav-item">
        Records
      </NavLink>
    </div>
  );
};

export default SideBar;
