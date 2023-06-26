import React, { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { useAuth } from "./AuthContext";

const API_URL = "https://track-your-wallet-mxq0.onrender.com/transactions"
const TransactionsContext = React.createContext();

export const TransactionsProvider = ({ children }) => {

    const { userId } = useAuth();
    const [earnings, setEarnings] = useState([]);
    const [spendings, setSpendings] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log(userId)
        if (userId) {
            getEarnings();
            getSpendings();
        }
    }, [userId]);


    const addEarning = async (earning) => {
        try {
            const response = await axios.post(`${API_URL}/add_Earnings/${userId}`, earning)
        } catch (error) {
            setError(error.response.data.message);
        }
        getEarnings();
    }
    const getEarnings = async () => {
        try {
            const response = await axios.get(`${API_URL}/get_Earnings/${userId}`);
            setEarnings(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    const deleteEarning = async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`${API_URL}/delete_Earning/${id}/${userId}`);
            console.log(response.data.message);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        getEarnings();
    }

    const TotalEarnings = () => {
        let totalEarnings = 0;
        earnings.forEach((earning) => {
            totalEarnings += earning.amount;
        })
        return totalEarnings;
    }
    //Spendings
    const addSpending = async (spending) => {
        try {
            const response = await axios.post(`${API_URL}/add_Spendings/${userId}`, spending)
        } catch (error) {
            setError(error.response.data.message);
        }
        getSpendings();
    }
    const getSpendings = async () => {
        try {
            const response = await axios.get(`${API_URL}/get_Spendings/${userId}`);
            setSpendings(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    const deleteSpending = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete_Spending/${id}/${userId}`);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        getSpendings();
    }

    const TotalSpendings = () => {
        let totalSpendings = 0;
        spendings.forEach((spending) => {
            totalSpendings += spending.amount;
        })
        return totalSpendings;
    }

    const totalBalance = () => {
        return TotalEarnings() - TotalSpendings();
    }

    const transactionsHistory = () => {
        const history = [...earnings, ...spendings];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history;
    }
    return (
        <TransactionsContext.Provider value={
            {
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
                transactionsHistory
            }
        }>
            {children}
        </TransactionsContext.Provider>
    )
}

export const useTransactionsContext = () => {
    return useContext(TransactionsContext)
}