import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-expense-tracker-2-0g78.onrender.com",
  // baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // VERY IMPORTANT
});

export default api;
