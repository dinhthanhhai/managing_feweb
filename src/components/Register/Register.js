import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-7 d-none d-sm-block">
            <div className="brand">Register</div>
            <div className="detail">
              You learned from the previous chapter that Bootstrap requires a
              containing element to wrap site contents.
            </div>
          </div>

          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">Register</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                placeholder="Email address"
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label>Phone numer:</label>
              <input
                type="text"
                placeholder="Phone number"
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label>User name:</label>
              <input
                type="text"
                placeholder="User name"
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="form-control"
              ></input>
            </div>

            <button className="btn btn-primary">Register</button>
            <hr />

            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
