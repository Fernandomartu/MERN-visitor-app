import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setVisitors: (state, action) => {
      if (state.user) {
        state.user.visitors = action.payload.visitors;
      } else {
        console.log("user visitors non-existent");
      }
    },
  },
});

export const { setMode, setLogin, setLogout, setVisitors } = authSlice.actions;
export default authSlice.reducer;