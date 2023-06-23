import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Components/Header';
import Dashboard from './pages/dashboard';
import Transactions from './pages/Transactions';
import Earnings from './pages/Earnings';
import Spendings from './pages/Spendings';
import Navigation from './Components/Navigation';
import Graph from './Components/Graph';

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
      <div>
        <Header toggleNav={toggleNav} />
        <Layout>
          {isNavOpen && <Navigation />}
          <Content>
            <MainContent>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/earnings" element={<Earnings />} />
                <Route path="/spendings" element={<Spendings />} />
              </Routes>
            </MainContent>
          </Content>
        </Layout>
      </div>
  );
};

const Layout = styled.div`
  display: flex;
  height: calc(100vh - 60px); /* Subtract header height */
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
