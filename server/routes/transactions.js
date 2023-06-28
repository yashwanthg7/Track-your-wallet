const { add_Earnings, get_Earnings, delete_Earning } = require("../controllers/Earnings");
const {add_Spendings , get_Spendings , delete_Spending} = require("../controllers/Spendings");
const {authenticateUser} = require("../middlewares/auth")

const router = require('express').Router();

router.post('/add_Earnings/:userid',authenticateUser, add_Earnings);
router.get('/get_Earnings/:userid',authenticateUser, get_Earnings);
router.delete('/delete_Earning/:id/:userid' ,authenticateUser, delete_Earning);

router.post('/add_Spendings/:userid',authenticateUser, add_Spendings);
router.get('/get_Spendings/:userid',authenticateUser, get_Spendings);
router.delete('/delete_Spending/:id/:userid',authenticateUser , delete_Spending);


module.exports = router;