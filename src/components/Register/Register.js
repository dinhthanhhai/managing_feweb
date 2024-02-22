import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/test-api").then((data) => {
  //     console.log(">>>> check datat axios: ", data.data);
  //   });
  // }, []);

  const handleRegister = () => {
    let check = isValidInputs();
    let userData = {
      email,
      phone,
      username,
      password,
    };
    console.log(">>>check userdata: ", userData);
  };

  const isValidInputs = () => {
    if (!email) {
      toast.error("Email is required!");
      return false;
    }
    if (!phone) {
      toast.error("Phone number is required!");
      return false;
    }
    if (!username) {
      toast.error("User name is required!");
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      return false;
    }
    if (password != comfirmPassword) {
      toast.error("Your password is not the same!");
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    return true;
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>Phone numer:</label>
              <input
                type="text"
                placeholder="Phone number"
                className="form-control"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>User name:</label>
              <input
                type="text"
                placeholder="User name"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="form-control"
                value={comfirmPassword}
                onChange={(event) => setComfirmPassword(event.target.value)}
              ></input>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>
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
