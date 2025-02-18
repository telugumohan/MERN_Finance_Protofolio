import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
    {
        budgetLabel: {
            type: String,
            required: true
        },
        budgetId: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: String,
            reuired: true
        },
        description: {
            type: String,
            default: ''
        },
        userId: {
            type: String,
            reuired: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('transactionModel', transactionSchema);