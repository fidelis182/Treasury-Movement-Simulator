import { SidebarData } from "../../Data/Data";
import "./sidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="menu">
        {SidebarData.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              isActive ? "menuItem active" : "menuItem"
            }
          >
            <item.icon />
            <span>{item.heading}</span>
          </NavLink>
        ))}
        <div className="menuItem logout">
          <UilSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
