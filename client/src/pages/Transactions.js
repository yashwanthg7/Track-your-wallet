import React from 'react';
import Table from "../Components/Table";
import { useTransactionsContext } from '../Context/TransactionsContext';
import styled from 'styled-components';

const Transactions = () => {
  const { totalBalance } = useTransactionsContext();

  return (
    <TransactionsStyled>
      <div className="total-income">
        <h2>Total Balance : </h2>
        <span>
          ₹{totalBalance()}
        </span>
      </div>
      <h2>Transactions</h2>
      <Table />
    </TransactionsStyled>
  )
}

const TransactionsStyled = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  .total-income {
    display: flex;
    align-items: center;
    background: #1f2937;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 1rem;
    gap: 0.5rem;
    color: #ffffff;
    width: 300px;

    span {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
`

export default Transactions
