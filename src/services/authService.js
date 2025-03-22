import apiLogin from "../utils/axiosConfig.js";

export const Login = async (correo, password) => {
  const response = await apiLogin.post("/auth/login", {
    correo,
    password,
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } else {
    throw new Error("Credenciales incorrectas");
  }
};

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getRole = () => {
  const user = getUser();
  return user ? user.role : [];
};
