import React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

const Container = styled.div`
  max-width: 6xl;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: #333333;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #1f2937;
  justify-content: space-between;
  padding: 1rem;
`;

const Heading = styled.h1`
  font-size: 40px;
  margin: 0 auto;
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

const Header = ({ toggleNav }) => {
  return (
    <Container>
      <ToggleButton onClick={toggleNav}>
        <FaBars />
      </ToggleButton>
      <Heading>Track Your Wallet</Heading>
    </Container>
  );
};

export default Header;
