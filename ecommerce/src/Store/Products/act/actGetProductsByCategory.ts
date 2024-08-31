import { TProduct } from "@CTypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct[]
const actGetProductsByCategory = createAsyncThunk(
    'products/actGetProductsByCategory',
    async (prefix,thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        
        try {
            const response = await axios.get<TResponse>(`/products?cat_prefix=${prefix}`);
            return response?.data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message)
            }
            return rejectWithValue('An Unexpected Error Accured')
        }
    })
export default actGetProductsByCategory