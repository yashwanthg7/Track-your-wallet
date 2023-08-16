import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_URL = "https://track-your-wallet-mxq0.onrender.com/auth";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { user } = response.data;
        console.log(user);
        setUser(user);
        setUserId(user._id);
        setLoggedIn(true);
        if (user.role === "admin") {
          window.location.href = "/";
        }
      } catch (error) {
        setLoggedIn(false);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { user, token, message } = response.data;
      localStorage.setItem('token', token);
      console.log(message);
      setUser(user);
      setUserId(user._id);
      setLoggedIn(true);
      window.location.href = "/";
    } catch (error) {
      setErrors({ login: error.response.message });
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { name, email, password });
      const { newUser, token } = response.data;
      console.log(response.data)
      setUser(newUser);
      localStorage.setItem('token', token);
      setUserId(newUser._id);
      setLoggedIn(true);
      window.location.href = "/";
    } catch (error) {
      const {message} = error.response.data;
      setErrors({ signup: message });
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem('token');
      setUser({});
      setLoggedIn(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/getusers/${userId}`);
      console.log(response.data);
      setUsers(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const authContextValue = {
    user,
    loggedIn,
    errors,
    login,
    signup,
    logout,
    userId,
    users,
    getAllUser
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
