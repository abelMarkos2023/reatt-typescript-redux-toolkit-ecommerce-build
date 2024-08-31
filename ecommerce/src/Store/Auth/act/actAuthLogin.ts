import {createAsyncThunk} from "@reduxjs/toolkit" 
import axios, { AxiosError } from "axios";

type TAuthLogin = {
    email:string;
    password:string;
}
interface ILoginresponce{
        accessToken :string;
        user:{
            id:number;
            firstname:string;
            lastname:string;
            email:string;
        }
    
}

const actAuthLogin = createAsyncThunk("Auth/actAuthLogin", async (formData:TAuthLogin,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axios.post<ILoginresponce>('/login',formData)
        return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export default actAuthLogin;