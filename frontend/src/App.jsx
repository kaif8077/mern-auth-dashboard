import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Signup setToken={setToken} />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route
        path="/dashboard"
        element={<Dashboard token={token} setToken={setToken} />}
      />
    </Routes>
  );
};

export default App;
