import React from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const handleCreateNewAccount = () => {
    navigate("/register");
  };

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
              className="form-control"
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
            ></input>
            <button className="btn btn-primary">Login</button>
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
