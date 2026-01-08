import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/issue" replace />;
  }

  return children;
};

export default PublicRoute;
