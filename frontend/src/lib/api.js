import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",  // ✅ correct backend
  withCredentials: false,
});

export default api;
