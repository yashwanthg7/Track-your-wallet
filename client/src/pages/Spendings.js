import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTransactionsContext } from '../Context/TransactionsContext';
import SpendingsModel from '../Components/SpendingsModel';
import SpendingsForm from '../Components/SpendingsForm';

const SpendingsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1f2937;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 1.5rem;
    gap: 0.5rem;
    color: #ffffff;

    span {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;

    @media (max-width: 1200px) {
      flex-direction: column;
      align-items: center;
    }

    .form-container {
      flex: 1;
    }

    .earnings {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

const Earnings = () => {
  const { spendings, getSpendings, TotalSpendings } = useTransactionsContext();


  return (
    <SpendingsStyled>
      <h2 className="total-income">
        Total Spendings : <span>₹{TotalSpendings()}</span>
      </h2>
      <div className="income-content">
        <div className="form-container">
          <SpendingsForm/>
        </div>
        <div className="spendings">
          {spendings.map((spending) => {
            const { _id, title, amount, date, category, description } = spending;
            return (
              <SpendingsModel
                key={_id}
                id={_id}
                title={title}
                description={description}
                amount={amount}
                date={date}
                category={category}
              />
            );
          })}
        </div>
      </div>
    </SpendingsStyled>
  );
};

export default Earnings;
