import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  deleting: [],
};

// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const fetchServices = createAsyncThunk(
  'serviceList/fetchAllServices',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    const data = await response.json();
    return data;
  }
)

export const removeService = createAsyncThunk(
  'serviceList/removeService',
  async (id) => {
    console.log(id);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  }
)

const serviceListSlice = createSlice({
  name: 'serviceList',
  initialState,
  reducers: {
    fetch_request: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetch_failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetch_success: (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(removeService.pending, (state, action) => {
        state.deleting.push(action.meta.arg);
      })
      .addCase(removeService.rejected, (state, action) => {
        state.deleting = state.deleting.filter((item) => item !== action.meta.arg);
        state.error = action.error.message;
      })
      .addCase(removeService.fulfilled, (state, action) => {
        state.error = null;
        state.deleting = state.deleting.filter((item) => item !== action.meta.arg);
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      })
  },
});

export const { fetch_request, fetch_failure, fetch_success } = serviceListSlice.actions;
export default serviceListSlice.reducer;
