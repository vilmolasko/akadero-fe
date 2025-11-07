// import { createSlice } from '@reduxjs/toolkit';

// // Initial state
// const initialState = {
//   isAuthenticated: false,
//   count: 0,
//   isInitialized: false,
// };

// // Slice
// export const UserReducer = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setLogin(state, action) {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     setLogout(state) {
//       state.isAuthenticated = false;
//     },
//     setCount(state) {
//       state.count += 1;
//     },
//     setInitialize(state) {
//       state.isInitialized = true;
//     },
//     updateStatus(state, action) {
//       if (state.user) {
//         state.user.status = action.payload;
//       }
//     },
//     verifyUser(state) {
//       if (state.user) {
//         state.user.isVerified = true;
//       }
//     },
//     updateUserRole(state) {
//       if (state.user) {
//         state.user.role = 'vendor';
//       }
//     },
//   },
// });

// // Actions
// export const {
//   setLogin,
//   setLogout,
//   setCount,
//   setInitialize,
//   updateStatus,
//   verifyUser,
//   updateUserRole,
// } = UserReducer.actions;

// export default UserReducer.reducer;
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

// initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  count: 0,
  isInitialized: false,
};

// slice
const slice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setLogin(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },

    setCount(state) {
      state.count = state.count + 1;
    },
    setInitialize(state) {
      state.isInitialized = true;
    },
    updateStatus(state, action) {
      state.user.status = action.payload;
    },
    verifyUser(state) {
      state.user.isVerified = true;
    },
    updateUserRole(state) {
      state.user.role = 'vendor';
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setLogin,
  setLogout,
  setCount,
  setInitialize,
  updateStatus,
  verifyUser,
  updateUserRole,
} = slice.actions;

// ----------------------------------------------------------------------
