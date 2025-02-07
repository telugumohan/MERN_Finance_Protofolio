import {configureStore} from "@reduxjs/toolkit";
import userRducer from "./features/userSlice.js";

const store = configureStore({
    reducer: {
        user_slice: userRducer
    }
});

export default store;