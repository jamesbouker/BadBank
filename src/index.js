import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContextProvider";
import BankNav from "./components/BankNav";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Withdraw from "./pages/withdraw";
import Deposit from "./pages/deposit";
import DebugData from "./pages/debugdata";
import Home from "./pages/home";
import SignOut from "./pages/signout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div className="App">
      <UserContextProvider>
        <BankNav />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signout" element={<SignOut />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="debug" element={<DebugData />} />
          </Routes>
        </Container>
      </UserContextProvider>
    </div>
  </BrowserRouter>
);
