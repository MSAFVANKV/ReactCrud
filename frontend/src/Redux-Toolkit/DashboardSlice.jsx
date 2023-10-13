import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminbaseURL } from "../Base/Constent";


export const getadminInfo = createAsyncThunk('admin/dashboard', () => {
    return axios.get(`${adminbaseURL}/dashboard`)
    .then((res) => {
       return res.data
    });
})

getadminInfo.pending
getadminInfo.fulfilled
getadminInfo.rejected


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        name: "",
        list: [],
        input: "",
        searchQuery: '',
        updateId: null,
        status: 'idle',   // to track request status
        error: null,
        updateUI: false,
        error: null,
 
    },
    reducers: {
        // setInput: (state, action) => {
        //     state.input = action.payload;
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(getadminInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getadminInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(getadminInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

// export const {setInput} = dashboardSlice.acction