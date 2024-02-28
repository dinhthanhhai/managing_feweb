import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Users = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
    }
  }, []);
  return <div>User component</div>;
};

export default Users;
