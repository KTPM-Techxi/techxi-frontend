import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: '',
  destination: '',
  distance: '',
  duration: '',
  directionsResponse: null,
  transportationMode: 'DRIVING',
  isSearch: false,
  cost: 0,
  parsedAdress: {},
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
    setParsedAdress: (state, action) => {
      state.parsedAdress = { ...state.parsedAdress, ...action.payload };
    },
  },
});

export const { setOrigin, setDestination, setDistance, setDuration, setTransportationMode, setCost, setParsedAdress } = mapSlice.actions;
export default mapSlice.reducer;
