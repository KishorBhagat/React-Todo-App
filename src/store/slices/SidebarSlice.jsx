import { createSlice } from "@reduxjs/toolkit";
// import { deleteUsers } from "../actions";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: true,
    reducers: {
        toggelMenu: (state) => {
            return !state;
        }
    }
})


export default sidebarSlice.reducer;

export const { toggelMenu } = sidebarSlice.actions;