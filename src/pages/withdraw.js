import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../components/Card/card";
import { useUserContext } from "../contexts/UserContextProvider";

export default function Withdraw() {
  const { activeUser, withdraw } = useUserContext();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [error, setError] = useState(null);

  return (
    <>
      <h2>Withdraw</h2>
      <Card
        body={
          activeUser ? (
            <>
              <div className="deposit-body">
                <h3>Balance</h3>
                <span>${activeUser.balance}</span>
              </div>

              <div className="deposit-body">
                <h3>Withdraw Amount</h3>
                <input
                  value={withdrawAmount}
                  onChange={(e) => {
                    setWithdrawAmount(e.target.value);
                  }}
                  className="form-control"
                  type="number"
                  placeholder="How much to withdraw?"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <Button
                disabled={withdrawAmount.length === 0}
                onClick={() => {
                  let value = parseFloat(withdrawAmount);
                  if (isNaN(value)) {
                    setError("Enter a valid number");
                    return;
                  }
                  if (value <= 0) {
                    setError("Enter a number larger than 0");
                    return;
                  }
                  if (value > activeUser.balance) {
                    setError(
                      "Enter a number less than or equal to your balance"
                    );
                    return;
                  }
                  setError(null);
                  withdraw(value);
                  setWithdrawAmount("");
                }}
                style={{ marginTop: "1rem" }}
              >
                Withdraw
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
