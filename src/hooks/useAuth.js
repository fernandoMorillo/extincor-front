import { useLocation } from "wouter";
import { getRole } from "../services/authService";

export const useAuth = () => {
  const role = getRole()?.toUpperCase() || "";

  return {
    isAdmin: role === "ADMINISTRADOR",
    isOperario: role === "OPERARIO",
    isCliente: role === "CLIENTE",
    isAuthenticated: role !== "",
  };
};

export const useAuthLogin = () => {
  const [location, setLocation] = useLocation();

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const requireAuth = () => {
    if (!isAuthenticated()) {
      setLocation("/login");
      return false;
    }
    return true;
  };

  return { isAuthenticated, requireAuth };
};
