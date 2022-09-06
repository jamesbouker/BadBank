import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/card";
import { useUserContext } from "../contexts/UserContextProvider";

export default function Login() {
  const { login } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    failed: false,
  });

  const navigate = useNavigate();

  function validate(field, label) {
    if (label.length === 0) {
      setErrors((prev) => {
        let temp = { ...prev };
        temp[field] = true;
        return temp;
      });
      return false;
    }
    return true;
  }

  function isValid() {
    let res = [validate("password", password), validate("email", email)];
    return !res.includes(false);
  }

  return (
    <>
      <h2>Login</h2>
      <Card
        body={
          <>
            Email <br />{" "}
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              id="email"
              className="form-control"
            />
            {errors.email && <p style={{ color: "red" }}>Enter an email</p>}
            Password <br />{" "}
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              id="password"
              className="form-control"
            />
            {errors.password && (
              <p style={{ color: "red" }}>Enter a password</p>
            )}
            <Button
              style={{ marginTop: "1rem" }}
              onClick={() => {
                if (isValid()) {
                  if (!login(email, password)) {
                    setErrors((prev) => ({ ...prev, failed: true }));
                  } else {
                    navigate("/");
                  }
                }
              }}
            >
              Login
            </Button>
            {errors.failed && <p style={{ color: "red" }}>Login failed</p>}
          </>
        }
      ></Card>
    </>
  );
}
