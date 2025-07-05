// src/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",   // change if you deploy back‑end
});

// attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
