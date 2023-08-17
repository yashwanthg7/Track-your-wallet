const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validationRules = {
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
    minLength: 8,
  },
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = validateFormData(req.body);

  if (errors) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Logged in successfully", token, user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const errors = validateFormData(req.body);

  if (errors) {
    return res.status(400).json({ errors });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const isAdmin = /@hashinsert\.com$/.test(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: isAdmin ? "admin" : "user",
    });

    let newUser = await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Logged in successfully", newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

const verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const getUsers = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, signup, logout, verifyToken, getUsers };
