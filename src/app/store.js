import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authSlice from './reducers/authSlice';
import mapSlice from '../components/Map/mapSlice';
import currentUserInforSlice from '../components/CallCenter/currentUserSlice';
const reducer = combineReducers({
  // here we will be adding reducers
});
const store = configureStore({
  reducer: {
    auth: authSlice,
    map: mapSlice,
    currentUserInfor: currentUserInforSlice,
  },
});
export default store;
