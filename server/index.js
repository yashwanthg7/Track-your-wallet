const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")


const transactions = require('./routes/transactions')
const userRouter = require('./routes/user');


const app = express();

require("dotenv").config();
const port = process.env.PORT;
app.use(cors());
app.use(cookieParser());

//middlewares
app.use(express.json());

//routes
app.use("/transactions",transactions);
app.use("/auth",userRouter)

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