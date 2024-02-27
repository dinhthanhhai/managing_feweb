import React, { useEffect } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  //Di den trang Login khi da co tai khoan
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  //Register
  const handleRegister = async () => {
    let check = isValidInputs();
    if (check == true) {
      let response = await registerNewUser(email, phone, username, password);
      let serverData = response.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        navigate("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };
  //Kiem tra du lieu hop le
  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    //check email
    if (!email) {
      toast.error("Email is required!");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address!");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    //check phone
    if (!phone) {
      toast.error("Phone number is required!");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    let regxPhone = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
    if (!regxPhone.test(phone)) {
      toast.error("Please enter a valid phone number!");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    //
    if (!username) {
      toast.error("User name is required!");
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (password !== comfirmPassword) {
      toast.error("Your password is not the same!");
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      return false;
    }
    return true;
  };

  useEffect(() => {
    // axios.get("http://localhost:8080/api/v1/test-api").then((data) => {
    //   console.log(">>>checkdata: ", data);
    // });

    axios.post("http://localhost:8080/api/v1/register", {
      email,
      phone,
      username,
      password,
    });
  }, []);

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
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>Phone numer:</label>
              <input
                type="text"
                placeholder="Phone number"
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
