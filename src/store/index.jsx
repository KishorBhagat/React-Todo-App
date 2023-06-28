import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/SidebarSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
    },
})

export default store;