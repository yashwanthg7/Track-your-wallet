const express = require("express");
const mongoose = require("mongoose");


const transactions = require('./routes/transactions')

const app = express();

require("dotenv").config();
const port = process.env.PORT;

//middlewares
app.use(express.json());

//routes
app.use("/transactions",transactions)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to DB.`);
        app.listen(port, () => console.log(`Server running on port ${port} 🎆`));
    } catch (error) {
        console.log(`error connecting to server->${error}`);
    }
};

startServer();