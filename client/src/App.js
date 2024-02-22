import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Components/Header";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/Transactions";
import Earnings from "./pages/Earnings";
import Spendings from "./pages/Spendings";
import Navigation from "./Components/Navigation";
import Register from "./pages/Register";
import "./App.css";
import Login from "./pages/LoginPage";
import { useAuth } from "./Context/AuthContext";
import RestrictedPage from "./pages/RestrictedPage";
import NotLoggedInPage from "./pages/NotLoggedInPage";

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { checkLoggedIn, loggedIn, user } = useAuth();

  const toggleNav = () => {
    if (loggedIn) {
      setIsNavOpen(!isNavOpen);
    }
  };
  // console.log(loggedIn);
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div>
      <Header toggleNav={toggleNav} showNav={!user || user.role !== "admin"} />
      {loggedIn ? ( // Check if the user is logged in
        <Layout>
          {(!user || user.role !== "admin") && isNavOpen && <Navigation />}
          <Content>
            <MainContent>
              <Routes>
                {user && user.role === "admin" ? (
                  <Route path="/" element={<RestrictedPage />} />
                ) : (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/earnings" element={<Earnings />} />
                    <Route path="/spendings" element={<Spendings />} />
                  </>
                )}
              </Routes>
            </MainContent>
          </Content>
        </Layout>
      ) : (
        <div style={{ marginTop: "50px" }}>
          <Routes>
            <Route path="/" element={<NotLoggedInPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

const Layout = styled.div`
  display: flex;
  height: 100%;
  /* Subtract header height */
`;

const Content = styled.div`
  flex: 1;
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

export default App;
