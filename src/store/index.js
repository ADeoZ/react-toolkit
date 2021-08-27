import { configureStore } from '@reduxjs/toolkit';
import serviceList from '../reducers/serviceListSlice';

export const store = configureStore({
  reducer: {
    serviceList,
  },
});
