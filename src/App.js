import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Nav />
        <Routes>
          <Route path="/news"></Route>
          <Route path="/contact"></Route>
          <Route path="/about"></Route>
          <Route path="/"></Route>
          <Route path="/login" element={<Login />}></Route>

          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
