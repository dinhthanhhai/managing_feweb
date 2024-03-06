import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={props.path} element={props.element} />;
      </Routes>
    </>
  );
};

export default PrivateRoutes;
