import { TProduct } from "@CTypes/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@Store/index";
import axios from "axios";


type TResponse = TProduct[]
type TWishList = {
    userId:number;
    itemId:number;
}[]
type TDataType = "productIds" | "productsFullInfo"
const actgetWishlist = createAsyncThunk('Wishlist/actgetWishlist', async(mode : TDataType,thunAPI) => {
    const {rejectWithValue,fulfillWithValue,getState} = thunAPI

    const {Auth:{user}} = getState() as RootState
    try {
        const response = await axios.get<TWishList>(`/wishlist?userId=${user.id}`)

        if(!response.data.length){
            return {data:[],type:"productsFullInfo"}
        }

        if(mode == 'productIds'){
            const ids = response.data.map(item => item.itemId)
            return {data:ids,type:"productIds"}
        }else if (mode == 'productsFullInfo')
        {
            const userList:string = response.data.map(item => `id=${item.itemId}`).join('&');

            const products = await axios.get<TResponse>(`/products?${userList}`);
            console.log(products.data)
            return {data:products.data,type:"productsFullInfo"} 
        }
        
    } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)
        }
        return rejectWithValue('An Unexpected Error Accured')
    }
})


export default actgetWishlist