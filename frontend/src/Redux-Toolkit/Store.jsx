import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./TaskSlice";
import { userSlice } from "./UserSlice";
import { adminSlice } from "./AdminSlice";
import { dashboardSlice } from "./DashboardSlice";
import productsSlice from "./productsSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        user:userSlice.reducer,
        admin:adminSlice.reducer,
        dashboard:dashboardSlice.reducer,
        products:productsSlice

    }
});

export default store