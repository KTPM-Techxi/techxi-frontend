import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authSlice from './reducers/authSlice';
const reducer = combineReducers({
  // here we will be adding reducers
});
const store = configureStore({
  reducer: {
    auth: authSlice
  }
});
export default store;
