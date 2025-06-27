import "./App.css";
import React from "react";
import AccountList from "./components/AccountList";
import TransactionLog from "./components/TransactionLog";
import Sidebar from "./components/SideBar";

function App() {
  return (
    <div>
      <Sidebar />
      <AccountList />
      <TransactionLog />
    </div>
  );
}

export default App;
