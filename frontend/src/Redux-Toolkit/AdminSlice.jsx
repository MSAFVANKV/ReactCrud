import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminbaseURL } from '../Base/Constent';

export const loginAdmin = createAsyncThunk('admin/login', async ({ email, password, userType }) => {
    try {
        const res = await axios.post(`${adminbaseURL}/login`, { email, password, userType });
        return res.data;
    } catch (error) {
        throw Error(error.response?.data?.msg || "Admin Login failed");
    }
});
export const loginManager = createAsyncThunk('admin/managerslog', async ({ email, password, userType }) => {
    try {
        const res = await axios.post(`${adminbaseURL}/managerslog`, { email, password, userType });
        return res.data;
    } catch (error) {
        throw Error(error.response?.data?.msg || "manager Login failed");
    }
});

export const signupAdmin = createAsyncThunk('admin/signup', async ({ email, password, userType }) => {
    try {
        const res = await axios.post(`${adminbaseURL}/signup`, { email, password, userType },{ withCredentials: true });
        return res.data;
    } catch (error) {
        throw Error(error.response?.data?.msg || "Admin signup failed");
    }
});

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        email: "",
        password: "",
        userType:"",
        isAdminLoggedIn: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        setAdminEmail: (state, action) => {
            console.log('Email being set:', action.payload);
            state.email = action.payload;
        },
        setError: (state, action) => {  // action to set error
                state.error = action.payload;
        },
        clearError: (state) => {  // action to clear error
                state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAdminLoggedIn = true;
                state.email = action.payload.email;
                state.error = null;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loginManager.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginManager.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAdminLoggedIn = true;
                state.email = action.payload.email;
                state.error = null;
            })
            .addCase(loginManager.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

// Actions
export const { setAdminEmail, setError, clearError } = adminSlice.actions;

// Selectors
export const selectAdminEmail = (state) => state?.admin?.email;

export const selectAdminIsLoggedIn = (state) => state.admin.isAdminLoggedIn;
export const selecAdmintError = (state) => state.admin?.error



export default adminSlice.reducer;
