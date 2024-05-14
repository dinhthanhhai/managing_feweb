import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  if (user && user.isAuthenticated === true) {
    return (
      <>
        <Routes>
          <Route path={props.path} element={props.element} />;
        </Routes>
      </>
    );
  } else {
    return navigate("/login");
  }
};

export default PrivateRoutes;
