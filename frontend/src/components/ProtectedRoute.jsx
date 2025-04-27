import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated || !allowedRoles.includes(role)) {
    console.log("Unauthorized access, redirecting to Home.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
