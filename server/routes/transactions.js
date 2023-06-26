const { add_Earnings, get_Earnings, delete_Earning } = require("../controllers/Earnings");
const {add_Spendings , get_Spendings , delete_Spending} = require("../controllers/Spendings")

const router = require('express').Router();

router.post('/add_Earnings/:userid', add_Earnings);
router.get('/get_Earnings/:userid', get_Earnings);
router.delete('/delete_Earning/:id/:userid' , delete_Earning);

router.post('/add_Spendings/:userid', add_Spendings);
router.get('/get_Spendings/:userid', get_Spendings);
router.delete('/delete_Spending/:id/:userid' , delete_Spending);


module.exports = router;