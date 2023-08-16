import React, { useContext, useState } from "react";
import axios from "axios";

const API_URL = "https://track-your-wallet-mxq0.onrender.com/transactions";
const TransactionsContext = React.createContext();

export const TransactionsProvider = ({ children }) => {
  const [earnings, setEarnings] = useState([]);
  const [spendings, setSpendings] = useState([]);
  const [error, setError] = useState(null);

  const addEarning = async (earning, userId) => {
    console.log(earning);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/add_Earnings/${userId}`,
        earning,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);
    }
    getEarnings(userId);
  };

  const getEarnings = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/get_Earnings/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const earnings  = response.data;
      console.log(response);
      setEarnings(earnings);
      return earnings;
    } catch (error) {
      setError(error);
    }
  };
  const deleteEarning = async (id, userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_URL}/delete_Earning/${id}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
    getEarnings(userId);
  };

  const TotalEarnings = () => {
    let totalEarnings = 0;
    earnings.forEach((earning) => {
      totalEarnings += earning.amount;
    });
    return totalEarnings;
  };
  //Spendings
  const addSpending = async (spending, userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/add_Spendings/${userId}`,
        spending,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);
    }
    getSpendings(userId);
  };
  const getSpendings = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/get_Spendings/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const  spendings  = response.data;
      setSpendings(spendings);
      return spendings;
    } catch (error) {
      setError(error);
    }
  };
  const deleteSpending = async (id, userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_URL}/delete_Spending/${id}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);
    }
    getSpendings(userId);
  };

  const TotalSpendings = () => {
    let totalSpendings = 0;
    spendings.forEach((spending) => {
      totalSpendings += spending.amount;
    });
    return totalSpendings;
  };

  const totalBalance = () => {
    return TotalEarnings() - TotalSpendings();
  };

  const transactionsHistory = () => {
    const history = [...earnings, ...spendings];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history;
  };
  return (
    <TransactionsContext.Provider
      value={{
        addEarning,
        getEarnings,
        earnings,
        deleteEarning,
        TotalEarnings,
        addSpending,
        getSpendings,
        deleteSpending,
        TotalSpendings,
        spendings,
        totalBalance,
        transactionsHistory,
        error,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = () => {
  return useContext(TransactionsContext);
};
