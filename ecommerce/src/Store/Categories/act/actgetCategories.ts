import { TCategory } from "@CTypes/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';


type TResponse = TCategory[]
const actgetCategories = createAsyncThunk('categories/actgetGategories',async(_,thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const {data} = await axios.get<TResponse>('/categories')
        return data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message);

        }else{
            return rejectWithValue('UnExpected Error')
        }
    }
})

export default actgetCategories