import axios from "axios";

const instance = axios.create({
    
  baseURL: import.meta.env.VITE_BACKEND_URL, // backend URL from .env
  withCredentials: true,

  
});

export default instance;
