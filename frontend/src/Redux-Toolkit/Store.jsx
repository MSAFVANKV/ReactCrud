import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./TaskSlice";
import { userSlice } from "./UserSlice";
import { adminSlice } from "./AdminSlice";
import { dashboardSlice } from "./DashboardSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        user:userSlice,
        admin:adminSlice,
        dashboard:dashboardSlice
    }
});

export default store