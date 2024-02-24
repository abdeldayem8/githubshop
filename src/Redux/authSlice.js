import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import { togglesidebar } from "./collapseSlice";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: localStorage.getItem('token') || null,
    },
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      },
      clearToken: (state) => {
        state.token = null;
        localStorage.removeItem('token');
        
      },
    },
  });

  

  
  export const { setToken, clearToken } = authSlice.actions;
  
  export default authSlice.reducer;
  