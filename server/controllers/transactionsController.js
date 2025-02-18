import transactionModel from "../models/TransactionModel.js";


//Get My Transactions
export const getMyTransactionsController = async (req, res) => {
    try {
        if(!req.userId) return response.json({message: "Unauthenticated"});
        const transactions = await transactionModel.find({userId: req.userId});
        return res.status(201).json(transactions);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};



//Create
export const createTransactionController = async (req, res) => {
    const {budgetLabel, budgetId, amount, date, description} = req.body;
    try {
        if(!req.userId) return response.json({message: "Unauthenticated"});
        const newTransaction = await transactionModel.create({budgetLabel, budgetId, amount, date, description, userId: req.userId});
        return res.status(201).json(newTransaction);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};

//Update
export const updateTransactionController = async (req, res) => {
    const {id} = req.params;
    const {budgetLabel, budgetId, amount, date, description} = req.body;
    try {
        if(!req.userId) return response.json({message: "Unauthenticated"});
        const newTransaction = await transactionModel.findByIdAndUpdate(id, {budgetLabel, budgetId, userId: req.userId, amount, date, description}, {new: true});
        return res.status(201).json(newTransaction);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};


//Delete
export const deleteTransactionController = async (req, res) => {
    const {id} = req.params;
    try {
        if(!req.userId) return response.json({message: "Unauthenticated"});
        const deletedTransaction = await transactionModel.findByIdAndDelete(id);
        return res.status(201).json(deletedTransaction);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};