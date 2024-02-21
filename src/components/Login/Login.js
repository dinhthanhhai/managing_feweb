import React from "react";
import "./Login.scss";

const Login = (props) => {
  return (
    <div className="login-container mt-3">
      <div className="container">
        <div className="row">
          <div className="content-left col-7 d-none d-sm-block">
            <div className="brand">Login</div>
            <div className="detail">
              You learned from the previous chapter that Bootstrap requires a
              containing element to wrap site contents.
            </div>
          </div>
          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
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
            <span className="text-center">Forgotten your password?</span>
            <div className="text-center">
              <button className="btn btn-success">Create New Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
