import { useLocation } from "wouter";

export const useAuth = () => {
  const role = localStorage.getItem("role")?.toUpperCase() || "";

  const isAdmin = role === '"ADMINISTRADOR"';
  const isOperario = role === '"OPERARIO"';
  const isCliente = role === '"CLIENTE"';
  const isAuthenticated = role !== "";

  return {
    isAdmin,
    isOperario,
    isCliente,
    isAuthenticated,
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
