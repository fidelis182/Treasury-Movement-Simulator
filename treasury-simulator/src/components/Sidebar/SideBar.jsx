import { SidebarData } from "../../Data/Data";
import "./sidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { useState } from "react";
export default function Sidebar() {
  // useState hook to have onely the first item selected
  const [selected, setselected] = useState(0);
  return (
    <div className="Sidebar">
      {/* Menu
       */}
      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              // sets the first element as the selected
              className={selected === index ? "menuItem active" : "menuItem"}
              // this one set the clicked one as the selected
              onClick={() => setselected(index)}
              key={index}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        <div className="menuItem">
          <UilSignOutAlt />
        </div>
      </div>
    </div>
  );
}
