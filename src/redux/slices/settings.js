import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

// initial state
const initialState = {
  currency: process.env.BASE_CURRENCY || 'USD',
  baseCurrency: process.env.BASE_CURRENCY || 'USD',
  rate: 1,
};

// slice
const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    handleChangeCurrency(state, action) {
      state.currency = action.payload.currency;
      state.baseCurrency = action.payload.baseCurrency;
      state.rate = action.payload.rate;
    },
    initializeSettings: (state, action) => {
      state.currency = action.payload.currency;
      state.baseCurrency = action.payload.baseCurrency;
      state.rate = action.payload.rate;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setThemeMode,
  setDirection,
  toggleSidebar,
  handleChangeCurrency,

  initializeSettings,
} = slice.actions;

// ----------------------------------------------------------------------
