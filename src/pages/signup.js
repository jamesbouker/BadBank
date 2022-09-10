import { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "../components/Card/card";
import { useUserContext } from "../contexts/UserContextProvider";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const { addUser } = useUserContext();

  function validate(field, label) {
    if (field === "password" && label.length < 8) {
      setErrors((prev) => {
        let temp = { ...prev };
        temp[field] = true;
        return temp;
      });
      return false;
    }
    if (label.length === 0) {
      setErrors((prev) => {
        let temp = { ...prev };
        temp[field] = true;
        return temp;
      });
      return false;
    }
    setErrors((prev) => {
      let temp = { ...prev };
      temp[field] = false;
      return temp;
    });
    return true;
  }

  function isValid() {
    let res = [
      validate("name", name),
      validate("password", password),
      validate("email", email),
    ];
    return !res.includes(false);
  }

  function handleSignup() {
    if (!isValid()) {
      return;
    }

    addUser({ name, email, password, balance: 100 });
    setShow(false);
  }

  function clearForm() {
    setShow(true);
    setName("");
    setEmail("");
    setPassword("");
    setErrors({
      name: false,
      email: false,
      password: false,
    });
  }

  const nothingEntered =
    name.length === 0 && password.length === 0 && email.length === 0;

  return (
    <>
      <h2>Signup</h2>
      <Card
        header="Create Account"
        body={
          show ? (
            <>
              Name
              <br />
              <input
                id="name"
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter your name"
              />
              {errors.name && <p style={{ color: "red" }}>Enter your name</p>}
              Email
              <br />
              <input
                id="email"
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter an email"
              />
              {errors.email && <p style={{ color: "red" }}>Enter your email</p>}
              Password
              <br />
              <input
                id="password"
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter a password"
              />
              {errors.password && (
                <p style={{ color: "red" }}>
                  Enter a password, 8 or more characters
                </p>
              )}
              <Button
                disabled={nothingEntered}
                style={{ marginTop: "1rem" }}
                onClick={handleSignup}
              >
                Create Account
              </Button>
            </>
          ) : (
            <>
              <h5>Success</h5>
              <Button onClick={clearForm}>Add another account</Button>
            </>
          )
        }
      />
    </>
  );
}
