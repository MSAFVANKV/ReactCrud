import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./TaskSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    }
});

export default store