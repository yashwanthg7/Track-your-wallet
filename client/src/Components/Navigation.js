import React from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { MenuItems } from '../utils/Menu';
import { useAuth } from '../Context/AuthContext';

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 300px;
  height: 100%;
  background-color: #1f2937;
  color: #ffffff;
  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      padding-left: 1rem;
      position: relative;
      i {
        font-size: 1.4rem;
      }
    }
  }
  .bottom-nav {
    margin-top: 250px;
    margin-left: 80px;
    margin-right: 0px;
    font-size: 20px;
    cursor: pointer;
  }
`;

const UserComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 25px;
  margin: 0;
`;

// const UserMoney = styled.p`
//   font-size: 12px;
//   margin: 0;
// `;

const Navigation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleItemClick = (link) => {
    navigate(link);
  };

  return (
    <NavStyled>
      <UserComponent>
        <UserText>
          <UserName>{user.name}</UserName>
        </UserText>
        <FaUserCircle style={{ fontSize: '40px' }} />
      </UserComponent>
      <ul className='menu-items'>
        {MenuItems.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item.link)}>
            {item.icon && React.createElement(item.icon)}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className='bottom-nav'>
        <FaSignOutAlt /> Sign Out
      </div>
    </NavStyled>
  );
};

export default Navigation;
