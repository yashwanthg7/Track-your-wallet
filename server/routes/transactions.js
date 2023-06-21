const { add_Earnings, get_Earnings, delete_Earning } = require("../controllers/Earnings");
const {add_Spendings , get_Spendings , delete_Spending} = require("../controllers/Spendings")

const router = require('express').Router();

router.post('/add_Earnings', add_Earnings);
router.get('/get_Earnings', get_Earnings);
router.delete('/delete_Earning/:id' , delete_Earning);

router.post('/add_Spendings', add_Spendings);
router.get('/get_Spendings', get_Spendings);
router.delete('/delete_Spending/:id' , delete_Spending);

module.exports = router;