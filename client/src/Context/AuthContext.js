import { createContext, useState, useEffect, useContext , useMemo} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://track-your-wallet-mxq0.onrender.com/auth";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.get(`${API_URL}/verify`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token as a header
        },
      });
      const { user } = response.data;
      console.log(user)
      setUser(user);
      setUserId(user._id);
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    }
  };
  const memoizedUser = useMemo(() => userId, [userId]);
  
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const data = response.data;
      const token = data.token;
      localStorage.setItem('token', token); // Store the token in localStorage
      setUser(data.user);
      setUserId(user._id);
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
      setUserId(user._id);
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
    userId
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
