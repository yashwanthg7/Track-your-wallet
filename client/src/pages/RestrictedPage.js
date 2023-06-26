import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useTransactionsContext } from '../Context/TransactionsContext';
import Table from "../Components/Table";
import styled from 'styled-components';

const RestrictedPage = () => {
    const { users, loggedIn, getAllUser, user } = useAuth();
    const { getEarnings, getSpendings, earnings, spendings } = useTransactionsContext();
    const [selectedUser, setSelectedUser] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            getAllUsers(user._id);
        }
    }, [loggedIn]);

    const getAllUsers = async (userId) => {
        try {
            await getAllUser(userId);
        } catch (error) {
            console.log(error);
        }
    };


    const handleUserSelect = (userId) => {
        setSelectedUser(userId);
        setLoading(true);
        getEarnings(userId)
            .then(() => getSpendings(userId))
            .finally(() => setLoading(false));
    };

    return (
        <div style={{ display: 'flex',flexDirection:"column", alignItems: 'center', justifyContent: 'center'}}>
        <h3>Please select a user to view their transactions</h3>
        <SelectWrapper>
          <SelectLabel>Select a user:</SelectLabel>
          <Select value={selectedUser} onChange={(e) => handleUserSelect(e.target.value)}>
            <option value="">Select a user</option>
            {users &&
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </Select>
        </SelectWrapper>
        {loading ? (
          <LoadingMessage>Loading...</LoadingMessage>
        ) : (
          <>
            {earnings  && <Table />}
          </>
        )}
      </div>
    );
};

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background-color: white;
  color :#1f2937;
  border-radius: 20px;
  padding : 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SelectLabel = styled.label`
  margin-right: 1rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
`;

const LoadingMessage = styled.p`
  margin-top: 1rem;
`;


export default RestrictedPage;
