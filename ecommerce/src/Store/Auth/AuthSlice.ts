import { LOADINGSTATE } from "@CTypes/shared"
import {createSlice} from "@reduxjs/toolkit"
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";

type TAuthState = {
    accessToken:string;
    user:{
        id:number;
        firstname:string;
        lastname:string;
        email:string;
    }
    loading:LOADINGSTATE;
    error:string | null
}

const initialState : TAuthState = {
    loading :"idle",
    error:null
}

const AuthSlice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        clearUI:(state)=> {
            state.loading = 'idle';
            state.error = null;
        },
        logout:(state)=> {
            state.accessToken = '';
            state.user = {}
            state.loading = 'idle';
            state.error = null;
        }
    },
    extraReducers: builder => {

        //register Action
        builder.addCase(actAuthRegister.pending,(state,action) => {
            state.loading = 'pending'
            state.error = null;
        })
        builder.addCase(actAuthRegister.fulfilled,(state,action) => {
            state.loading = 'succeeded'
            state.error = null
        })
        builder.addCase(actAuthRegister.rejected,(state,action) => {
            state.loading = 'failed'
            if(typeof action.payload === 'string'){
                state.error = action.payload
            }
        })

        //Login
        builder.addCase(actAuthLogin.pending,(state,action) => {
            state.loading = 'pending'
            state.error = null;
        })
        builder.addCase(actAuthLogin.fulfilled,(state,action) => {
            state.loading = 'succeeded'
            state.error = null;
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        })
        builder.addCase(actAuthLogin.rejected,(state,action) => {
            state.loading = 'failed'
            if(typeof action.payload === 'string'){
                state.error = action.payload
            }
        })

        

    }
})
export default AuthSlice.reducer
export const {clearUI,logout} = AuthSlice.actions;