import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("check context user: ", user);

    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Routes>
        <Route path={props.path} element={props.element} />;
      </Routes>
    </>
  );
};

export default PrivateRoutes;
