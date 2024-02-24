import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isopen: true,
};

const sidebarSlice = createSlice({
    name:"sidebar",
    initialState,
    reducers:{
        togglesidebar: function (state) {
             state.isopen = !state.isopen;
          },
    }
})
export const {togglesidebar} = sidebarSlice.actions;
export default  sidebarSlice.reducer;