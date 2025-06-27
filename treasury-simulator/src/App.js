import "./App.css";
import React from "react";
import AccountList from "./AccountList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
