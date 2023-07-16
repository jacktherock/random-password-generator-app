import React from "react";
import PasswordGenerator from "./components/PasswordGenerator";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <div className="box">
        <PasswordGenerator />
      </div>
    </div>
  );
};

export default App;
