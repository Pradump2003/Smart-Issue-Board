import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  // ✅ WAIT until auth check finishes
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/issue" replace />;
  }

  return children;
};

export default PublicRoute;
