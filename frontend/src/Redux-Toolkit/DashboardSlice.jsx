import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminbaseURL } from "../Base/Constent";
import axios from "axios";


// export const getadminInfo = createAsyncThunk('admin/dashboard', () => {
//     return axios.get(`${adminbaseURL}/all-users`)
//     .then((res) => {
//        return res.data
//     });
// })

export const getadminInfo = createAsyncThunk('admin/dashboard', async () => {
    const response = await axios.get(`${adminbaseURL}/all-users`, { withCredentials: true });
    return response.data.data;  // access the data property of the response
});


export const toggleBlockUser = createAsyncThunk('users/toggleBlock',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${adminbaseURL}/toggle-block/${userId}`);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


export const addManager = createAsyncThunk('admin/addManager', async (managerDetails) => {
    try {
      const res = await axios.post(`${adminbaseURL}/managers`, managerDetails, { withCredentials: true });
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  });
  
  // ... the rest of your Redux slice ...
  

  


getadminInfo.pending
getadminInfo.fulfilled
getadminInfo.rejected


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        list: [],
        name: "",
        input: "",
        searchQuery: '',
        updateId: null,
        status: 'idle',   // to track request status
        error: null,
        
 
    },
    reducers: {
        // setInput: (state, action) => {
        //     state.input = action.payload;
        // },
        setUsers: (state, action) => {
            state.list = action.payload;
        },
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
            })
            .addCase(toggleBlockUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(toggleBlockUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const userIndex = state.list.findIndex(user => user._id === action.payload.user._id);
                if (userIndex !== -1) {
                    state.list[userIndex] = action.payload.user;
                }
            })
            .addCase(toggleBlockUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addManager.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addManager.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // You can add more logic if needed
            })
            .addCase(addManager.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const {setInput, setUsers } = dashboardSlice.actions

export const setUserList = (state) => state.dashboard.list;
