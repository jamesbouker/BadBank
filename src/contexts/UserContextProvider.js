import { createContext, useContext, useMemo, useState } from "react";

const DUMMY_USERS = [
  {
    name: "Jimmy Bouker",
    balance: 100,
    email: "james.bouker@gmail.com",
    password: "123456",
  },
];

export const UserContext = createContext({
  users: DUMMY_USERS,
  activeUser: DUMMY_USERS[0],
  addUser: (user) => {},
  logout: () => {},
  login: (email, password) => {},
  deposit: (amount) => {},
  withdraw: (amount) => {},
});

export function UserContextProvider(props) {
  const [users, setUsers] = useState([...DUMMY_USERS]);
  const [innerActiveUser, setActiveUser] = useState(null);

  const innerEmail = innerActiveUser?.email ?? "";
  const innerPassword = innerActiveUser?.password ?? "";
  const activeUser = useMemo(() => {
    return users.find(
      (user) => user.email === innerEmail && user.password === innerPassword
    );
  }, [innerEmail, innerPassword, users]);

  function login(email, password) {
    const found = users.find(
      (user) => user.email === email && user.password === password
    );
    if (found) {
      setActiveUser(found);
      return true;
    }
    return false;
  }

  function logout() {
    setActiveUser(null);
  }

  function addUser(newUser) {
    setUsers([...users, newUser]);
    setActiveUser({ ...newUser });
  }

  function deposit(amount) {
    setUsers((prev) => {
      const temp = [...prev];
      let index = temp.findIndex((user) => user === activeUser);
      temp[index].balance += amount;
      return temp;
    });
  }

  function withdraw(amount) {
    setUsers((prev) => {
      const temp = [...prev];
      let index = temp.findIndex((user) => user === activeUser);
      temp[index].balance -= amount;
      return temp;
    });
  }

  const contextValue = {
    users,
    activeUser,
    addUser,
    login,
    logout,
    deposit,
    withdraw,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
