import React, { useEffect } from "react";
import Graph from "../Components/Graph";
import { useTransactionsContext } from "../Context/TransactionsContext";
import { useAuth } from "../Context/AuthContext";
import styled from "styled-components";

const Dashboard = () => {
  const { user } = useAuth();
  const { getEarnings, getSpendings, totalBalance, spendings, earnings } =
    useTransactionsContext();
  useEffect(() => {
    getEarnings(user._id);
    getSpendings(user._id);
  }, [user._id, spendings, earnings , getEarnings, getSpendings]);
  return (
    <div>
      <DashboardStyled>
        <div className="total-income">
          <h2>Total Balance : </h2>
          <span>₹{totalBalance()}</span>
        </div>
      </DashboardStyled>
      <Graph />
    </div>
  );
};
const DashboardStyled = styled.div`
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
`;
export default Dashboard;
