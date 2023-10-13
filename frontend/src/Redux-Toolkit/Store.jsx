import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./TaskSlice";
import { userSlice } from "./UserSlice";
import { adminSlice } from "./AdminSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        user:userSlice,
        admin:adminSlice
    }
});

export default store