import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-dun-six-74.vercel.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // VERY IMPORTANT
});

export default api;
