import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import { baseURL } from '../Base/Constent';


export const getDataInfo = createAsyncThunk('api/get', async () => {
    const res = await axios.get(`${baseURL}/get`);
    return res.data;
})

getDataInfo.pending
getDataInfo.fulfilled
getDataInfo.rejected

// ... Other imports and code ...

export const taskSlice = createSlice({
    name: 'tasks',
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
        nameError: null,
        taskError: null,
    },
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload;
        },
        setTasks: (state, action) => {
            state.list = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setUpdateId: (state, action) => {
            state.updateId = action.payload;
        },
        toggleUI: (state) => {
            state.updateUI = !state.updateUI;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },resetState: state => {
            return initialState;
        },
        // setError: (state, action) => {  // action to set error
        //     state.error = action.payload;
        // },
        // clearError: (state) => {  // action to clear error
        //     state.error = null;
        // },
        setNameError: (state, action) => {
            state.nameError = action.payload;
        },
        setTaskError: (state, action) => {
            state.taskError = action.payload;
        },
        clearNameError: (state) => {
            state.nameError = null;
        },
        clearTaskError: (state) => {
            state.taskError = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getDataInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDataInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(getDataInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

// ... rest of the slice code ...

export const { setTasks, setInput, setSearchQuery, setUpdateId, toggleUI, setName, resetState, setError, clearError,
               setNameError, setTaskError, clearNameError, clearTaskError  } = taskSlice.actions

export const selectTasks = (state) => state.tasks.list;
export const selectInput = (state) => state.tasks.input;
export const selectSearchQuery = (state) => state.tasks.searchQuery;
export const selectUpdateId = (state) => state.tasks.updateId;
export const selectName = (state) => state.tasks.name;
export const selectError = (state) => state.tasks.error




export default taskSlice.reducer;