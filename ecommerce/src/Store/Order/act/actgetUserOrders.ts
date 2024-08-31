import { TOrder } from "@CTypes/orders";
import { TProduct } from "@CTypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@Store/index";
import axios from "axios";

type TResponse = TOrder[]
const actgetUserOrders = createAsyncThunk(
    'Order/actgetUserOrders',
    async (_,thunkAPI) => {
        const {rejectWithValue,getState,signal} = thunkAPI

        const {Auth:{user}} = getState() as RootState;
        
        try {
           const response = await axios.get<TResponse>(`/orders?userId=${user.id}`);

           return response.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message)
            }
            return rejectWithValue('An Unexpected Error Accured')
        }
    })
export default actgetUserOrders