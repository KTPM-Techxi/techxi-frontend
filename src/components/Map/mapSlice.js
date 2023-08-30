import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: '',
  destination: '',
  distance: '',
  duration: '',
  directionsResponse: null,
  transportationMode: '',
  isSearch: false,
  cost: 0,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setTransportationMode: (state, action) => {
      state.transportationMode = action.payload;
    },
    setCost: (state, action) => {
      state.cost = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setDistance, setDuration, setTransportationMode, setCost } = mapSlice.actions;
export default mapSlice.reducer;
