import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTransactionsContext } from '../Context/TransactionsContext';
import { useAuth } from '../Context/AuthContext';

const SpendingsFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* height: 100%; */
  max-width: 500px;
  background-color: #1f2937;
  color: #ffffff;
  padding: 1.5rem;
  border-radius: 2%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: #ffffff;
    color: #333333;
    max-width: 50%;

    &::placeholder {
      color: #888888;
    }
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;

    select {
      color: #333333;

      &:focus,
      &:active {
        color: #333333;
      }
    }
  }

  .submit-btn {
    button {
      background-color: #4b5563;
      color: #ffffff;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #1f2937;
      }
    }
  }
`;

const SpendingsForm = () => {
  const {user} = useAuth();
  const { addSpending} = useTransactionsContext();
  const [input, setInput] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = input;

  const handleInput = (name) => (e) => {
    setInput({ ...input, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSpending(input , user._id);
    setInput({ 
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
      });
  };

  return (
    <SpendingsFormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Spending Title"
          onChange={handleInput('title')}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={amount}
          name="amount"
          placeholder="Amount Spent"
          onChange={handleInput('amount')}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => {
            setInput({ ...input, date });
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput('category')}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="Movies">Movies</option>
          <option value="Shopping">Shopping</option>
          <option value="Hospital">Hospital</option>
          <option value="investments">Investments</option>
          <option value="Rent">Rent</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput('description')}
        ></textarea>
      </div>
      <div className="submit-btn">
        <button>+ Add Spending</button>
      </div>
    </SpendingsFormStyled>
  );
};

export default SpendingsForm;
