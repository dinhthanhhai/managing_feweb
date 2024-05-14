import "./App.scss";
import Nav from "./components/Navigation/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div className="app-header">
        <Nav />
      </div>
      <div className="app-container">
        <AppRoutes />
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
    </>
  );
}

export default App;
