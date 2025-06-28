import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/SideBar";
import MainDashboard from "./components/MainDashboard/MainDashboard";
import AccountList from "./components/AccountList/AccountList";
import TransactionLog from "./components/Transaction/TransactionLog";

import "./App.css";

const App = () => {
  return (
    <div className="appGlass" style={{ display: "flex" }}>
      <Sidebar />

      <div className="main-content" style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <MainDashboard>
                <AccountList />
              </MainDashboard>
            }
          />
          <Route
            path="/transactions"
            element={
              <MainDashboard>
                <TransactionLog />
              </MainDashboard>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
