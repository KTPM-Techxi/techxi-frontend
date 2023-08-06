import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  infor: {},
};

const currentUserInforSlice = createSlice({
  name: 'currentUserInfor',
  initialState,
  reducers: {
    setInfor: (state, action) => {
      state.infor = action.payload;
    },
  },
});

export const { setInfor } = currentUserInforSlice.actions;
export default currentUserInforSlice.reducer;
