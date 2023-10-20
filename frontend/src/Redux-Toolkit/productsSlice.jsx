import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminbaseURL } from "../Base/Constent";
import axios from "axios";

// export const loginProducts = createAsyncThunk('admin/managers', async ({manegername, password}) => {
//     const response = await axios.post(`${adminbaseURL}/LoginManager`,{ manegername, password }, { withCredentials: true });
//     return response.data.data;  // access the data property of the response
// });

export const productSlice  = createSlice({
    name: 'products',
    initialState:{
        email: "",
        isLoggedIn: false,
        status: 'idle',
        error: null,
        updateUI: false 
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
    }
})