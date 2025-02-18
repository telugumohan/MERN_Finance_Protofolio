import * as API from "../api/index.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getBudgetsAction = createAsyncThunk('GET_BUDGETS', async () => {
    const {data} = await API.getBudgetsApi();
    return data;
});

export const createBudgetAction = createAsyncThunk('CREATE_BUDGET', async (budget) => {
    const {data} = await API.createBudgetApi(budget);
    return data;
});


export const updateBudgetAction = createAsyncThunk('UPDATE_BUDGET', async ({id, newBudget}) => {
    const {data} = await API.updateBudgetApi(id, newBudget);
    return data;
});


export const deleteBudgetAction = createAsyncThunk('DELETE_BUDGET', async (id) => {
    const {data} = await API.deleteBudgetApi(id);
    return data;
});


const budgetSlice = createSlice(
    {
        name: 'budget_slice',
        initialState: {
            budgets: [],
            status: null,
            selectedBudget: null
        },
        reducers: {
            setSelectedBudget: (state, action) => {
                state.selectedBudget = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getBudgetsAction.fulfilled, (state, action) => {
                    state.budgets = action.payload;
                    state.status = 'success';
                })
                .addCase(createBudgetAction.fulfilled, (state, action) => {
                    state.budgets = [...state.budgets, action.payload];
                })
                .addCase(updateBudgetAction.fulfilled, (state, action) => {
                    state.budgets = state.budgets.filter((budget) => budget._id !== action.payload._id);
                    state.budgets = [...state.budgets, action.payload];
                })
                .addCase(deleteBudgetAction.fulfilled, (state, action) => {
                    state.budgets = state.budgets.filter((budget) => budget._id !== action.payload._id);
                })
        }
    }
);

export const {setSelectedBudget} = budgetSlice.actions;
export default budgetSlice.reducer;