import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentAuth : false ,
    userid : "" ,
    username : "" 
    
}

const AuthSlice = createSlice({
    name : "auth",
    initialState ,

    reducers:{
        setAuth : (state , action)=>{
            const { isAuth , userid , username} = action.payload
           state.currentAuth = isAuth
            state.userid =  userid 
            state.username = username
        },

        getAuth : (state , action)=>{
            return state.currentAuth
        },

        getuser : (state , action)=>{
           return state 
        }

    }
})


export const {setAuth ,getAuth} = AuthSlice.actions

export default AuthSlice.reducer