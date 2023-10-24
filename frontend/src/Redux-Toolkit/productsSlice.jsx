import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { adminbaseURL } from '../Base/Constent';

export const getProducts = createAsyncThunk('manager/products', async () => {
    const response = await axios.get(`${adminbaseURL}/getProducts`, { withCredentials: true });
    return response.data.data;  // access the data property of the response
});

export const uploadProduct = createAsyncThunk('products/upload', async (formData) => {
    try {
        const res = await axios.post(`${adminbaseURL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw Error(error.response?.data?.msg || "Upload failed");
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        // product: null,
        status: 'idle',
        error: null,
        updateProductUI: false,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        toggleProUI: (state) => {
            state.updateProductUI = !state.updateProductUI;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(uploadProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.details;
                state.error = null;
            })
            .addCase(uploadProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload
                state.error = null;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const {setProducts ,toggleProUI} = productsSlice.actions

export default productsSlice.reducer;
