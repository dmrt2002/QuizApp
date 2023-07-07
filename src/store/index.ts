import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import questionReducer from "./questions/questionSlice"
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer , persistStore } from 'redux-persist'

const reducers = combineReducers({
    user: userReducer,
    question: questionReducer         
});
   
   const persistConfig = {
       key: 'root',
       storage
   };
   
   const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
