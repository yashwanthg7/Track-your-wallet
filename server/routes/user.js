const { login, logout, signup, getUsers } = require("../controllers/user");
const router = require('express').Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/getusers/:userid", getUsers);
router.get('/verify', verifyToken);
  

module.exports = router;