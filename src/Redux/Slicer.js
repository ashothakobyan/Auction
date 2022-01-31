import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    user: {
        email: "",
        name: "",
        surName: "",
        balanse: "",
        uid: "",
        referance: "",
        isAuth: "",
        userIMg:"",
        myBougthItems:""
    },
    liveDrow: "CardImg"
}
const reducer = {
    setUser: (state, action) => {
        state.user = {
            ...state.user,
            ...action.payload
        }
    },
    setLiveDrow: (state, action) => {
        state.liveDrow = action.payload.liveDrow

    },
    setAuth:(state) => {
        state.user = initialState
    }

},

    counterSlice = createSlice({
        name: 'auction',
        initialState,
        reducers: reducer
    })

// Action creators are generated for each case reducer function
export const { setUser, setLiveDrow,setAuth } = counterSlice.actions

export default counterSlice.reducer