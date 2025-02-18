import budegetCategory from "../models/BudegetCategory.js";


//Get My Budgets
export const getMyBudgetsController = async (req, res) => {
    try {
        if(!req.userId) return response.json({message: "Unauthenticated"});
        const budgets = await budegetCategory.find({userId: req.userId});
        return res.status(201).json(budgets);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};



//Create
export const createBudegtController = async (req, res) => {
    const {budgetLabel, budgetAmount} = req.body;
    try {
        if(!req.userId) return response.json({message: "Unauthenticated"});
        const existingBudget = await budegetCategory.findOne({userId: req.userId, budgetLabel: budgetLabel});
        if(existingBudget) return res.status(404).json("A budget with same category exists!!");
        const newBudget = await budegetCategory.create({budgetLabel, budgetAmount, userId: req.userId});
        return res.status(201).json(newBudget);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};

//Update
export const updateBudegtController = async (req, res) => {
    const {id} = req.params;
    const {budgetLabel, budgetAmount} = req.body;
    try {
        if(!req.userId) return response.json({message: "Unauthenticated"});
        const newBudget = await budegetCategory.findByIdAndUpdate(id, {budgetLabel, budgetAmount}, {new: true});
        return res.status(201).json(newBudget);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};


//Delete
export const deleteBudegtController = async (req, res) => {
    const {id} = req.params;
    try {
        if(!req.userId) return response.json({message: "Unauthenticated"});
        const deletedBudget = await budegetCategory.findByIdAndDelete(id);
        return res.status(201).json(deletedBudget);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};