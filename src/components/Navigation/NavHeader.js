import "./NavHeader.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../services/userService";
import { FaHouseMedicalFlag } from "react-icons/fa6";

import {
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "../../redux/authSlice";

const NavHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const isAuthenticated = currentUser?.isAuthenticated;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutStart());
    try {
      let res = await logoutUser();
      if (res.EC === 0) {
        dispatch(logoutSuccess());
        navigate("/login");
      } else {
        dispatch(logoutFailed());
      }
    } catch (error) {
      dispatch(logoutFailed());
      console.log(error);
    }
  };

  return (
    // <div className="topnav">
    //   {location.pathname !== "/login" && (
    //     <>
    //       <NavLink to="/">Home</NavLink>
    //       <NavLink to="/about">About</NavLink>
    //     </>
    //   )}
    //   {isAuthenticated && (
    //     <>
    //       <NavLink to="/users">Users</NavLink>
    //       <NavLink to="/projects">Projects</NavLink>
    //       <button onClick={() => handleLogout()}>Logout</button>
    //     </>
    //   )}
    // </div>
    <>
      <div className="nav-header">
        <Navbar bg="header" expand="lg" className="bg-body-tertiary">
          <Container>
            <FaHouseMedicalFlag size={50} style={{ color: "#03AED2" }} />
            <Navbar.Brand>Manage</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  Users
                </NavLink>
                <NavLink to="/projects" className="nav-link">
                  Projects
                </NavLink>
              </Nav>
              <Nav>
                <Nav.Item className="nav-link">Welcome user</Nav.Item>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Change password
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavHeader;
