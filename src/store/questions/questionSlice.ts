import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface questionState {
    title: string;
    questions: string;
}
const initialState: questionState = {
    title: "React",
    questions:"4"
}

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        updateTitle: (state, action: PayloadAction<questionState>) => {
            state.title = action.payload.title;
            state.questions = action.payload.questions;
            console.log(action.payload.title);
        }
    }
})

export const { updateTitle } = questionSlice.actions
export default questionSlice.reducer