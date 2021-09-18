import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function NavBarMenu() {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Container fluid>
        <Navbar.Brand className="font-weight-bold text-white">
          <img
            src={learnItLogo}
            alt="learnItLogo"
            width="32"
            height="32"
            className="mr-2"
          />
          Learn It
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className="font-weight-bold text-white"
              to="/dashboard"
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="font-weight-bold text-white"
              to="/about"
              as={Link}
            >
              About
            </Nav.Link>
          </Nav>

          <Nav className="d-flex justify-content-center align-items-center">
            <Nav.Link className="font-weight-bold text-white" disabled>
              Welcome {username}
            </Nav.Link>

            <Button
              variant="secondary"
              className="font-weight-bold text-white"
              onClick={logout}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarMenu;
