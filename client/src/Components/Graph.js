import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useTransactionsContext } from "../Context/TransactionsContext";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
// import faker from 'faker';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip,
  Filler
);

const Graph = () => {
  const { earnings, spendings, transactionsHistory } = useTransactionsContext();

  const dateFormat = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  const [...history] = transactionsHistory();

  const labels = history.map((earning) => dateFormat(earning.date));

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Earnings",
        data: earnings.map((earning) => earning.amount),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        fill: true,
        label: "Spendings",
        data: spendings.map((spending) => spending.amount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 50%;
`;

export default Graph;
