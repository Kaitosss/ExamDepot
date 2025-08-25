import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function ProtectedRoute({ children, role }) {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && authUser.role !== role) {
    return <Navigate to="/user/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
