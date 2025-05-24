import axios from "axios";


console.log("url:", import.meta.env.VITE_API_BASE_URL);
const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      window.location.href =" /login";
    }
  }
)

export default axiosConfig;
