import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import questionReducer from "./questions/questionSlice"
export const store = configureStore({
    reducer: {
        user: userReducer,
        question: questionReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
