import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../components/Card/card";
import { useUserContext } from "../contexts/UserContextProvider";

export default function Deposit() {
  const { activeUser, deposit } = useUserContext();
  const [depositAmount, setDepositAmount] = useState("");
  const [error, setError] = useState(null);

  return (
    <>
      <h2>Deposit</h2>
      <Card
        body={
          activeUser ? (
            <>
              <div className="deposit-body">
                <h3>Balance</h3>
                <span>${activeUser.balance}</span>
              </div>

              <div className="deposit-body">
                <h3>Deposit Amount</h3>
                <input
                  value={depositAmount}
                  onChange={(e) => {
                    setDepositAmount(e.target.value);
                  }}
                  className="form-control"
                  type="number"
                  placeholder="How much to deposit?"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <Button
                disabled={depositAmount.length === 0}
                onClick={() => {
                  let value = parseFloat(depositAmount);
                  if (isNaN(value)) {
                    setError("Enter a valid number");
                    return;
                  }
                  if (value <= 0) {
                    setError("Enter a number larger than 0");
                    return;
                  }
                  setError(null);
                  deposit(value);
                  setDepositAmount("");
                }}
                style={{ marginTop: "1rem" }}
              >
                Deposit
              </Button>
            </>
          ) : (
            <>
              <p>Not logged in</p>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </>
          )
        }
      ></Card>
    </>
  );
}
