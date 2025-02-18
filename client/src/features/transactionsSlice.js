import * as API from "../api/index.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getTransactionsAction = createAsyncThunk('GET_TRANSACTIONS', async () => {
    const {data} = await API.getTransactionsApi();
    return data;
});

export const createTransactionAction = createAsyncThunk('CREATE_TRANSACTION', async (transaction) => {
    const {data} = await API.createTransactionApi(transaction);
    return data;
});


export const updateTransactionAction = createAsyncThunk('UPDATE_TRANSACTION', async ({id, newTransaction}) => {
    const {data} = await API.updateTransactionApi(id, newTransaction);
    return data;
});


export const deleteTransactionAction = createAsyncThunk('DELETE_TRANSACTION', async (id) => {
    const {data} = await API.deleteTransactionApi(id);
    return data;
});


const transactionsSlice = createSlice(
    {
        name: 'transaction_slice',
        initialState: {
            transactions: [],
            status: null,
            selectedTransaction: null
        },
        reducers: {
            setSelectedTransactionAction: (state, action) => {
                state.selectedTransaction = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getTransactionsAction.fulfilled, (state, action) => {
                    state.transactions = action.payload;
                    state.status = 'success';
                })
                .addCase(createTransactionAction.fulfilled, (state, action) => {
                    state.transactions = [...state.transactions, action.payload];
                })
                .addCase(updateTransactionAction.fulfilled, (state, action) => {
                    state.transactions = state.transactions.filter((transaction) => transaction._id !== action.payload._id);
                    state.transactions = [...state.transactions, action.payload];
                })
                .addCase(deleteTransactionAction.fulfilled, (state, action) => {
                    state.transactions = state.transactions.filter((transaction) => transaction._id !== action.payload._id);
                })
        }
    }
);

export const {setSelectedTransactionAction} = transactionsSlice.actions;
export default transactionsSlice.reducer;