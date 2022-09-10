import { useState } from "react";
import { Container, Navbar, OverlayTrigger, Popover } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContextProvider";

export default function BankNav() {
  let { activeUser } = useUserContext();
  console.log("Active user: " + activeUser);

  let pages = [
    activeUser != null ? "signout" : "",
    "signup",
    activeUser == null ? "login" : "",
    "deposit",
    "withdraw",
    "debug",
  ];
  let pageDescription = {
    signout: "Signout of your account",
    signup: "Signup for a new account",
    login: "Login to your account",
    deposit: "Deposit money!",
    withdraw: "Withdraw money!",
    debug: "View all the debug data",
  };
  const navigation = useNavigate();
  const [activeRoute, setActiveRoute] = useState("home");

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          style={{
            cursor: "pointer",
            color: activeRoute === "home" ? "black" : "gray",
          }}
          onClick={() => {
            setActiveRoute("home");
            navigation("/");
          }}
        >
          Bad Bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages
              .filter((page) => page.length > 0)
              .map((page, index) => (
                <OverlayTrigger
                  trigger="hover"
                  key={`${page}-overlay`}
                  placement="bottom"
                  overlay={
                    <Popover id={`popover-positioned-bottom`}>
                      <Popover.Header as="h3">
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                      </Popover.Header>
                      <Popover.Body>{pageDescription[page]}</Popover.Body>
                    </Popover>
                  }
                >
                  <Nav.Item key={page}>
                    <Nav.Link style={{ marginRight: "8px" }}>
                      <Link
                        style={{
                          color: activeRoute === page ? "black" : "gray",
                        }}
                        to={`/${page}`}
                        onClick={() => {
                          setActiveRoute(page);
                        }}
                      >
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                      </Link>
                    </Nav.Link>
                  </Nav.Item>
                </OverlayTrigger>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
