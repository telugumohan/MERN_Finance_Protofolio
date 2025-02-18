import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../api/index.js"

export const signUpAction = createAsyncThunk('SIGN_UP', async (formData) => {
    const {data} = await API.signUpApi(formData);
    return data;
});

export const signInAction = createAsyncThunk('SIGN_IN', async (formData) => {
    const {data} = await API.signInApi(formData);
    return data;
});

const userSlice = createSlice(
    {
        name: 'user_slice',
        initialState: {
            user: null,
            status: null
        },
        reducers: {
            logoutAction: (state, action) => {
                state.user = null;
                state.status = null;
                localStorage.setItem('profile', null);
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(signUpAction.fulfilled, (state, action) => {
                    state.status = 'success';
                    state.user = action.payload;
                    localStorage.setItem('profile', JSON.stringify(action.payload));
                })
                .addCase(signInAction.fulfilled, (state, action) => {
                    state.status = 'success';
                    state.user = action.payload;
                    localStorage.setItem('profile', JSON.stringify(action.payload));
                })
        }
    }
);

export const {logoutAction} = userSlice.actions;
export default  userSlice.reducer;