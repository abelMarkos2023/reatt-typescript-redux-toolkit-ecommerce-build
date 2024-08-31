import { TProduct } from "@CTypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@Store/index";
import axios from "axios";

type TResponse = TProduct[]
const actgetProductsByItems = createAsyncThunk('Cart/actgetProductsByItems', async(_,thunkApi) => {

    const {rejectWithValue,getState,fulfillWithValue} = thunkApi
    const {Cart} = getState() 
    const ids = Object.keys(Cart.items)
    if(!ids.length){
        return fulfillWithValue([])
    }
    try {
        const idsUrlString = ids.map(id => `id=${id}`).join('&')
        const response = await axios.get<TResponse>(`/products?${idsUrlString}`)
        return response.data
    } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)
        }else{
            return rejectWithValue('An unexpected error occurred')
        }
    }
})

export default actgetProductsByItems