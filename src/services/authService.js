import apiLogin from "../utils/axiosConfig.js";

export const Login = async (correo, password) => {
  const response = await apiLogin.post("/auth/login", {
    correo,
    password,
  });

  if (response.data.token) {
    const data = await response.data;
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.data?.usuario?.correo)
    );
    localStorage.setItem("role", JSON.stringify(response.data?.usuario?.roles));
    return data;
  } else {
    throw new Error("Credenciales incorrectas");
  }
};

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");

  return true;
};

export const getRole = () => {
  const role = localStorage.getItem("role");
  return role;
};
