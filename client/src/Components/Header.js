import React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 6xl;
  margin: 0 auto;
  
  color: #333333;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #1f2937;
  justify-content: space-between;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Heading = styled.h1`
  font-size: 30px;
  margin: 0;
  color: #ffffff;
  border-radius: 4px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 24px;
  margin-left: 16px;
`;

const AuthButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const AuthButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  margin-left: 16px;
`;

const Header = ({ toggleNav }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <ToggleButton onClick={toggleNav}>
        <FaBars />
      </ToggleButton>
      <Heading>Track Your Wallet</Heading>
      <AuthButtonsContainer>
        <AuthButton onClick={handleRegister}>Register</AuthButton>
        <AuthButton onClick={handleLogin}>Login</AuthButton>
      </AuthButtonsContainer>
    </Container>
  );
};

export default Header;
