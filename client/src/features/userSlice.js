import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {fetchUsersDataFromApi} from "../api/index.js";

export const fetchUserAction = createAsyncThunk("FETCH_USER", async () => {
    const response = await fetchUsersDataFromApi();
    return response.data;
});

const userSlice = createSlice(
    {
        name: "user_slice",
        initialState: {
            users: {},
            status: null,
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchUserAction.fulfilled, (state, action) => {
                    state.users = action.payload;
                    state.status = "success"
                })
                .addCase(fetchUserAction.pending, (state, action) => {
                    state.status = "loading"
                })
        }
    }
);

export default userSlice.reducer;