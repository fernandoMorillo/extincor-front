import axios from "axios";

console.log("url:", import.meta.env.VITE_API_BASE_URL);
const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosConfig;
