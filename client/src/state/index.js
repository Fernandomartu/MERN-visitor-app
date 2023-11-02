import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  modules: [],
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
    setScanModules: (state, action) => {
      state.modules = action.payload.modules;
    },
    setScanModule: (state, action) => {
      const updatedModules = state.modules.map((module) => {
        if (module._id === action.payload.module._id)
          return action.payload.module;
        return module;
      });
      state.modules = updatedModules;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setVisitors,
  setScanModules,
  setScanModule,
} = authSlice.actions;
export default authSlice.reducer;
