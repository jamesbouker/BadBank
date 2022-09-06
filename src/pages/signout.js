import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContextProvider";

export default function SignOut() {
  const { activeUser, logout } = useUserContext();
  return (
    <>
      <h2>Sign Out</h2>
      {activeUser ? (
        <>
          <p>Logged in as {activeUser.email}</p>
          <Button onClick={logout}>Sign Out</Button>
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </>
      )}
    </>
  );
}
