import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { persistReducer , FLUSH , REHYDRATE , PAUSE ,PERSIST ,PURGE ,REGISTER } from "redux-persist";
import  storage  from "redux-persist/lib/storage";


const persistConfig={key:"root", storage,version:1}
const persistedReducer=persistReducer(persistConfig,authReducer)


export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[FLUSH , REHYDRATE , PAUSE ,PERSIST ,PURGE ,REGISTER]
            }
        })
})