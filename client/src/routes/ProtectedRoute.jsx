import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { isLogged, user } = useUser();

  if (user === null && !isLogged) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
