import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";

function Header({ history }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    let role = null;
    if (auth) {
      role = auth.user.role;
      setRole(role);
      setName(auth.user.name);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [history.location]);

  return (
    <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Restaurant Review Project
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {isAuthenticated && (
          <Nav className="mr-auto">
            {role === "customer" && (
              <Nav.Link as={Link} to="/restaurants">
                Restaurants
              </Nav.Link>
            )}

            {role === "owner" && (
              <Nav.Link as={Link} to="/reviews">
                Pending Reviews
              </Nav.Link>
            )}

            {(role === "owner" || role === "admin") && (
              <Nav.Link as={Link} to="/restaurants">
                {role === "owner" ? "My restaurants" : "Restaurants"}
              </Nav.Link>
            )}

            {role === "admin" && (
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            )}
          </Nav>
        )}

        <Nav className="ml-auto">
          {!isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </>
          )}
          {isAuthenticated && (
            <NavDropdown title={name} id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signout">
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(Header);
