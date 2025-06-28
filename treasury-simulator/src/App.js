import "./App.css";
import React from "react";
import Sidebar from "./components/Sidebar/SideBar";
import MainDashboard from "./components/MainDashboard/MainDashboard";

function App() {
  return (
    <div>
      <Sidebar />
      <MainDashboard />
    </div>
  );
}

export default App;
