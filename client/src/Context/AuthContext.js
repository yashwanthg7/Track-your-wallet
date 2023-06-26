import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://track-your-wallet-mxq0.onrender.com/auth";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get(`${API_URL}/verify`);
      const { user } = response.data;
      setUser(user);
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false); 
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const data = response.data;
      setUser(data.user);
      setLoggedIn(true);
      navigate("/");
    } catch (error) {
      setErrors({ login: error.response.data.message });
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { name, email, password });
      const data = response.data;
      setUser(data.newUser);
      setLoggedIn(true);
      navigate("/");
    } catch (error) {
      setErrors({ signup: error.response.data.message });
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      setUser({});
      setLoggedIn(false);
      navigate("/login");
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
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
