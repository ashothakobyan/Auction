import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState = {
    user:{
        email:"",
        name:"",
        surName:"",
        balanse:"",
        uid:""
    },
    liveDrow:"CardImg"
}


const reducer = {
    setUser:(state,action) => {
        state.user.email = action.payload.email
        state.user.name = action.payload.name
        state.user.surName = action.payload.surName
        state.user.balanse = action.payload.balanse
        state.user.uid = action.payload.uid

    },
    setLiveDrow:(state,action) =>{
        state.liveDrow = action.payload.liveDrow
        console.log(action.liveDrow)
    }
  },

counterSlice = createSlice({
  name: 'auction',
  initialState,
  reducers:reducer
})

// Action creators are generated for each case reducer function
export const {setUser,setLiveDrow} = counterSlice.actions

export default counterSlice.reducer