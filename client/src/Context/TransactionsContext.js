import React, { useContext, useState } from "react"
import axios from 'axios';

const API_URL = "https://track-your-wallet-mxq0.onrender.com/transactions"
const TransactionsContext = React.createContext();

export const TransactionsProvider = ({ children }) => {

    const [earnings, setEarnings] = useState([]);
    const [spendings, setSpendings] = useState([]);
    const [error, setError] = useState(null);

    const addEarning = async (earning) => {
        try {
            const response = await axios.post(`${API_URL}/add_Earnings`, earning)
        } catch (error) {
            setError(error.response.data.message);
        }
        getEarnings();
    }
    const getEarnings = async () => {
        try {
            const response = await axios.get(`${API_URL}/get_Earnings`);
            setEarnings(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    const deleteEarning = async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`${API_URL}/delete_Earning/${id}`);
            console.log(response.data.message);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        getEarnings();
    }

    const TotalEarnings = () =>{
        let totalEarnings = 0;
        earnings.forEach((earning) =>{
            totalEarnings += earning.amount;
        })
        return totalEarnings;
    }
                      //Spendings
    const addSpending = async (spending) => {
        try {
            const response = await axios.post(`${API_URL}/add_Spendings`, spending)
        } catch (error) {
            setError(error.response.data.message);
        }
        getEarnings();
    }
    const getSpendings = async () => {
        try {
            const response = await axios.get(`${API_URL}/get_Spendings`);
            setSpendings(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    const deleteSpending = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete_Spending/${id}`);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        getSpendings();
    }

    const TotalSpendings = () =>{
        let totalSpendings = 0;
        spendings.forEach((spending) =>{
            totalSpendings += spending.amount;
        })
        return totalSpendings;
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
            }
        }>
            {children}
        </TransactionsContext.Provider>
    )
}

export const useTransactionsContext = () => {
    return useContext(TransactionsContext)
}