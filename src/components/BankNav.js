import { Container, Navbar } from "react-bootstrap";
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
  const navigation = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => {
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
              .map((page) => (
                <Nav.Item key={page}>
                  <Link style={{ marginRight: "8px" }} to={`/${page}`}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Link>
                </Nav.Item>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
