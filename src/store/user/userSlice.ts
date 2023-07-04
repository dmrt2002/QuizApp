import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface userState {
    id: string;
    name: string;
    email: string;
}
const initialState: userState = {
    id: "1",
    name: "Tushar",
    email:"tushar@gmail.com"
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<userState>) => {
            state= action.payload
        }
    }
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer