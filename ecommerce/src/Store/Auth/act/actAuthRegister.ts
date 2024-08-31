import {createAsyncThunk} from "@reduxjs/toolkit" 
import axios, { AxiosError } from "axios";

type TAuthRegister = {
    firstname:string;
    lastname:string;
    email:string;
    password:string;
}

const actAuthRegister = createAsyncThunk("Auth/actAuthRegister", async (formData:TAuthRegister,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axios.post('/register',formData)
        return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export default actAuthRegister;