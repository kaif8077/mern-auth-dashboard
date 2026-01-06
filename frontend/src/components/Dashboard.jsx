import React, { useEffect, useState } from "react";
import api from "../utils/axios";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Dashboard = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [joke, setJoke] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // user data
    api
      .get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUsername(res.data.username))
      .catch(() => navigate("/login"));

    // joke API
    axios
      .get("https://v2.jokeapi.dev/joke/Programming?type=single")
      .then(res => setJoke(res.data.joke));
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="p-8 space-y-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold">
            Welcome, {username} 👋
          </h2>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="font-semibold">😂 Programming Joke</p>
          <p className="mt-2 text-gray-700">{joke || "Loading joke..."}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
