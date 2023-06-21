const spendingsSchema = require("../models/spendings");

const add_Spendings = async (req, res) => {
    const {
        title,
        amount,
        category,
        description,
        date,
    } =
        req.body;

    const parsedDate = new Date(date);

    const newSpending = spendingsSchema({
        title,
        amount,
        category,
        description,
        date: parsedDate,
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        await newSpending.save();
        res.status(200).json({ message: "New Spending added succesfully" })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const get_Spendings = async (req, res) => {
    try {
        const spendings = await spendingsSchema.find().sort({ createdAt: -1 });
        res.status(200).json(spendings);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

}

const delete_Spending = async (req, res) => {
    const { id } = req.params;

    try {
        await spendingsSchema.findByIdAndDelete(id);
        res.status(200).json({message : "Spending deleted Succesfully"});
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = { add_Spendings , get_Spendings , delete_Spending};