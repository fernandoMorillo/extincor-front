import { getRole } from "../services/authService";

export const useAuth = () => {
  const roles = getRole();
  return {
    isAdmin: roles.includes("ADMIN"),
    isOperario: roles.includes("OPERARIO"),
    isCliente: roles.includes("CLIENTE"),
    isAuthenticated: roles.length > 0,
  };
};
