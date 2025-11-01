import axios from "axios";

// Prefer Render backend if available, otherwise local
const baseURL =
  import.meta.env.VITE_BACKEND_RENDER ||
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:5000";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
