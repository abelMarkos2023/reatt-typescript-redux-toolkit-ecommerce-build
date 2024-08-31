import { TProduct } from "@CTypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@Store/index";
import axios from "axios";

type TResponse = TProduct[]
const actPlaceOrder = createAsyncThunk(
    'Order/actPlaceOrder',
    async (subTotal:number,thunkAPI) => {
        const {rejectWithValue,getState} = thunkAPI

        const {Auth:{user},Cart} = getState() as RootState;
        const orderedProducts = Cart.totalProducts.map(item => ({
            id:item.id,
            price:item.price,
            img:item.img,
            title:item.title,
            quantity:Cart.items[item.id]
        }))
        try {
           const response = await axios.post('/orders',{
            userId:user.id,
            subTotal:subTotal,
            items:orderedProducts
           })
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message)
            }
            return rejectWithValue('An Unexpected Error Accured')
        }
    })
export default actPlaceOrder