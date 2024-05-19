import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
  return (
    <>
      {/* <PrivateRoutes path="/users" element={<Users />} />
      <PrivateRoutes path="/projects" element={<div>Project</div>} /> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<div>Hello</div>} />
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<Users />} />
          <Route path="/projects" element={<div>Project</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
