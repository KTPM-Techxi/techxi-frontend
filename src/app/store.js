import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authSlice from './reducers/authSlice';
import mapSlice from './reducers/mapSlice';
const reducer = combineReducers({
  // here we will be adding reducers
});
const store = configureStore({
  reducer: {
    auth: authSlice,
    map: mapSlice
  }
});
export default store;
