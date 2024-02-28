import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/ManageUsers/Users";
import { useEffect, useState } from "react";
import _ from "lodash";

function App() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="app-container">
        {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
        <Routes>
          <Route path="/news"></Route>
          <Route path="/contact"></Route>
          <Route path="/about"></Route>
          <Route path="/"></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/users" element={<Users />}></Route>

          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
