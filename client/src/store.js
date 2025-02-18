import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import budgetSlice from "./features/budgetsSlice.js";
import transactionsSlice from "./features/transactionsSlice.js";

const store = configureStore({
    reducer: {
        user_slice: userSlice,
        budget_slice: budgetSlice,
        transactions_slice: transactionsSlice
    }
});

export default store;