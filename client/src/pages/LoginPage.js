import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, errors } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <LoginStyledForm onSubmit={handleLogin}>
      <h1>Login</h1>
      {errors.login && <LoginErrorMessage>{errors.login}</LoginErrorMessage>}
      <FormGroup>
        <Label>Email</Label>
        <LoginStyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <LoginStyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      <LoginStyledButton type="submit">Login</LoginStyledButton>
      <LoginLink>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </LoginLink>
    </LoginStyledForm>
  );
};

const LoginStyledForm = styled.form`
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
width: 100%;
  display: block;
  margin-bottom: 5px;
`;

const LoginStyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const LoginStyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1f2937;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LoginErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const LoginLink = styled.p`
  margin-top: 10px;

  a {
    color: #1f2937;
    font-weight: bold;
    text-decoration: none;
  }
`;

export default Login;
