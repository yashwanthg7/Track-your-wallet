import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup, errors } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(name,email,password)
    signup(name, email, password);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <RegisterStyledForm onSubmit={handleSignup}>
      <h1>Sign Up</h1>
      {errors.signup && (
        <RegisterErrorMessage>{errors.signup}</RegisterErrorMessage>
      )}
      <FormGroup>
        <Label>Name</Label>
        <RegisterStyledInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <RegisterStyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <RegisterStyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      <RegisterStyledButton type="submit">Sign Up</RegisterStyledButton>
      <RegisterLink>
        Already existing user? <Link to="/login">Login</Link>
      </RegisterLink>
    </RegisterStyledForm>
  );
};

const RegisterStyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
    font-weight: bold;
    font-size: larger;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const RegisterStyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const RegisterStyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1f2937;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RegisterErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const RegisterLink = styled.p`
  margin-top: 10px;

  a {
    color: #1f2937;
    font-weight: bold;
    text-decoration: none;
  }
`;

export default Signup;
