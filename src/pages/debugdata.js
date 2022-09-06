import { Table } from "react-bootstrap";
import Card from "../components/Card/card";
import { useUserContext } from "../contexts/UserContextProvider";

export default function DebugData() {
  const { users } = useUserContext();
  return (
    <>
      <h2>Debug Data</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
