import React, { useState, useEffect } from 'react';
import { useTransactionsContext } from '../Context/TransactionsContext';
import styled from 'styled-components';

const TransactionTable = () => {
    const { transactionsHistory } = useTransactionsContext();
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const [...history] = transactionsHistory();
        setTransactions(history);
    }, []);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentTransactions = transactions.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const getRowColor = (transactionType) => {
        return transactionType === 'earnings' ? 'blue' : 'red';
    };

    const formatAmount = (amount, transactionType) => {
        const prefix = transactionType === 'earnings' ? '+' : '-';
        return `${prefix}${amount}`;
    };

    return (
        <TableStyled>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTransactions.map((transaction) => (
                        <tr
                            key={transaction._id}
                            className={`transaction-row ${getRowColor(transaction.type)}`}
                        >
                            <td>{formatDate(transaction.date)}</td>
                            <td>{transaction.title}</td>
                            <td>{formatAmount(transaction.amount, transaction.type)}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <button
                    className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </TableStyled>
    );
};

const TableStyled = styled.div`
.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.transaction-table th,
.transaction-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.transaction-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.transaction-row.blue {
  color: #2dc653;
}

.transaction-row.red {
  color: #ef233c;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
td{
    font-weight: bold;
}

.pagination-button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.pagination-button.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
`;

export default TransactionTable;
