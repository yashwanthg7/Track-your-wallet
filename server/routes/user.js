const express = require("express");
const router = express.Router();
const { login, logout, signup, getUsers , verifyToken} = require("../controllers/user");


router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/getusers/:userid", getUsers);
router.get('/verify', verifyToken);
  

module.exports = router;