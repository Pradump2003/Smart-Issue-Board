import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  // ✅ WAIT until auth check is finished
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
