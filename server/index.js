import dotenv from "dotenv";

// Configure dotenv to load variables from .env file
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import budgetsRouter from "./routes/budgetRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add routes here
app.use('/user', userRouter);
app.use('/budgets', budgetsRouter);
app.use('/transactions', transactionRouter);
// End Routes

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('App Connected to MongoDB successfully');
        app.listen(PORT, () => {
            console.log(`App is listening to PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error in MongoDB Connection');
    });
