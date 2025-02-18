import mongoose from "mongoose";

const budgetSchema = mongoose.Schema(
    {
        budgetLabel: {
            type: String,
            required: true
        },
        budgetAmount: {
            type: Number,
            required: true
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

export default mongoose.model('budgetCategory', budgetSchema);