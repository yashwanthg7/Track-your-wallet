import React from 'react';
import styled from 'styled-components';
import { FaRupeeSign } from 'react-icons/fa';
import { BsCalendarDate, BsFillChatRightTextFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useTransactionsContext } from '../Context/TransactionsContext';
import { useAuth } from '../Context/AuthContext';

const SpendingsModelStyled = styled.div`
  background: #1f2937;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 450px;
  height: 150px;
  color: #fff;

  .delete-button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1f2937;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    transition: background-color 0.3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    &:hover {
      background-color: grey;
      color: #1f2937;
    }

    svg {
      color: #fff;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;


    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.8;
        }
      }
    }
  }
`;

const EarningModel = ({ id, title, amount, date, category, description }) => {
  const {user} = useAuth();
  const { deleteSpending } = useTransactionsContext();
  const handleDelete = (id) => {
    deleteSpending(id , user._id);
  };

  const formattedDate = new Date(date).toLocaleDateString('en-GB');

  return (
    <SpendingsModelStyled>
      <div className='content'>
        <h5>{title}({category})</h5>
        <div className='inner-content'>
          <div className='text'>
            <p>
              <FaRupeeSign />
              {amount}
            </p>
            <p>
              <BsCalendarDate />
              {formattedDate}
            </p>
            <p>
              <BsFillChatRightTextFill />
              <span>{description}</span>
            </p>
          </div>
        </div>
      </div>

      <button className='delete-button' onClick={() => handleDelete(id)}>
        <RiDeleteBinLine size={45} />
      </button>
    </SpendingsModelStyled>
  );
};

export default EarningModel;
