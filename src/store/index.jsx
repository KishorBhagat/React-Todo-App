import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/SidebarSlice";
import authReducer from "./slices/authSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'

// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage
// }

// const persistedAuthReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        auth: authReducer,
        // devTools: process.env.NODE_ENV !== 'production',
    },
})

export default store;

// export const persistor = persistStore(store)