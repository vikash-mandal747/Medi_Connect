// src/api.js
import axios from "axios";
import dotenv from "dotenv"

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,   // change if you deploy back‑end
});

// attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
