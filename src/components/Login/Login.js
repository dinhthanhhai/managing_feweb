import { useEffect, useState, useContext } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const Login = (props) => {
  const { loginContext } = useContext(UserContext);

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  //Chuyen den trang register khi muon dk tk
  const navigate = useNavigate();
  const handleCreateNewAccount = () => {
    navigate("/register");
  };

  //Login
  const handleLogin = async () => {
    setObjCheckInput(defaultValidInput);
    if (!valueLogin) {
      toast.error("Please enter your email address or phone number!");
      setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
      return;
    }
    if (!password) {
      toast.error("Please enter your password!");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return;
    }

    let response = await loginUser(valueLogin, password);
    if (response && +response.EC === 0) {
      //success
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;

      let data = {
        isAuthenticated: true,
        token: token,
        account: { groupWithRoles, email, username },
      };

      sessionStorage.setItem("account", JSON.stringify(data));
      loginContext(data);

      navigate("/users");
      // window.location.reload();
    }
    if (response && +response.EC !== 0) {
      toast.error(response.EM);
    }
  };

  //Enter to login
  const handlePressEnter = (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      handleLogin();
    }
  };

  //Logged -> Users page
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      navigate("/users");
      window.location.reload();
    }
  }, []);

  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-7 d-none d-sm-block">
            <div className="brand">Login</div>
            <div className="detail">
              You learned from the previous chapter that Bootstrap requires a
              containing element to wrap site contents.
            </div>
          </div>

          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">Login</div>
            <input
              type="text"
              placeholder="Email address or phone number"
              className={
                objCheckInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={
                objCheckInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              onChange={(event) => setPassword(event.target.value)}
              onKeyPress={(event) => handlePressEnter(event)}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
            <hr />
            <span className="text-center">
              <a href="#" className="forgot-password">
                Forgotten your password?
              </a>
            </span>
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
