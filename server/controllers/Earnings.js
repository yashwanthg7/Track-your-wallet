const earningsSchema = require("../models/earnings");

const add_Earnings = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const { userid } = req.params;

    console.log("1",req.body)

    const parsedDate = new Date(date);

    const newEarnings = earningsSchema({
        title,
        amount,
        category,
        description,
        date: parsedDate,
        user: userid,
    });
    console.log("2",newEarnings)

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        await newEarnings.save();
        res.status(200).json({ message: "New Earning added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


const get_Earnings = async (req, res) => {
    const { userid } = req.params;

    try {
        const earnings = await earningsSchema.find({ user: userid }).sort({ createdAt: -1 });
        res.status(200).json(earnings);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const delete_Earning = async (req, res) => {
    const { id, userid } = req.params;

    try {
        const deletedEarning = await earningsSchema.findOneAndDelete({ _id: id, user: userid });
        if (!deletedEarning) {
            return res.status(404).json({ message: "Earning not found" });
        }
        res.status(200).json({ message: "Earning deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { add_Earnings, get_Earnings, delete_Earning };