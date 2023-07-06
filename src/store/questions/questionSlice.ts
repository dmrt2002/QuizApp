import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface questionState {
    title: string;
    questions: string;
    url: string;
}
const initialState: questionState = {
    title: "React",
    questions:"4",
    url: ""
}

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        updateTitle: (state, action: PayloadAction<questionState>) => {
            state.title = action.payload.title;
            state.questions = action.payload.questions;
        },
        updateURL: (state, action: PayloadAction<string>) => {
            state.url = action.payload
        }
    }
})

export const { updateTitle , updateURL} = questionSlice.actions
export default questionSlice.reducer