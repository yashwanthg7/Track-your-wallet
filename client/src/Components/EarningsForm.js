import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTransactionsContext } from '../Context/TransactionsContext';
import { useAuth } from '../Context/AuthContext';

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
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

const EarningsForm = () => {

  const {user} = useAuth();
  const { addEarning} = useTransactionsContext();
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
    addEarning(input , user._id);
    setInput({ 
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
      });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Income Title"
          onChange={handleInput('title')}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={amount}
          name="amount"
          placeholder="Income amount"
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
          <option value="Salary">Salary</option>
          <option value="Freelancing">Freelancing</option>
          <option value="Investments">Investments</option>
          <option value="Trading">Trading</option>
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
        <button>+ Add Earning</button>
      </div>
    </FormStyled>
  );
};

export default EarningsForm;
