import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  console.log("isAuthenticated:", user.isAuthenticated);

  if (user && user.isAuthenticated === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
