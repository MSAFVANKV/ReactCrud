import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./TaskSlice";
import { userSlice } from "./UserSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        user:userSlice
    }
});

export default store