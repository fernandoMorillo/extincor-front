import { useAuthLogin } from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { requireAuth } = useAuthLogin();

  if (!requireAuth()) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
