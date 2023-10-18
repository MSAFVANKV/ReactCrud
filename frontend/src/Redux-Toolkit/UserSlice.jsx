import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../Base/Constent';

// Async Action Creators
// export const loginUser = createAsyncThunk('user/login', async ({ email, password }) => {
//     const res = await axios.post(`${baseURL}/login`, { email, password });
//     return res.data;
// });
export const loginUser = createAsyncThunk('user/login', async ({ email, password }) => {
    try {
        const res = await axios.post(`${baseURL}/login`, { email, password });
        return res.data;
    } catch (err) {
        throw Error(err.response?.data?.msg || "Login failed");
    }
});

export const signupUser = createAsyncThunk('user/signup', async ({ email, password }) => {
    const res = await axios.post(`${baseURL}/signup`, { email, password },{ withCredentials: true });
    return res.data;
});

// User Slice
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: "",
        isLoggedIn: false,
        status: 'idle',
        error: null,
        updateUI: false  // If you want UI toggle for users similar to tasks
    },
    reducers: {
        setEmail: (state, action) => {
            console.log('Email being set:', action.payload);
            state.email = action.payload;
        },
        setUsers: (state, action) => action.payload
        // Add more reducers if needed...
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoggedIn = true;
                state.email = action.payload.email;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isLoggedIn = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

// Actions
export const { setEmail, setUsers } = userSlice.actions;

// Selectors
export const selecError = (state) => state.user?.error

export const selectEmail = (state) => state?.user?.email;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

// Reducer
export default userSlice.reducer;
