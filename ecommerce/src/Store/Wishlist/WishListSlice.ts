import { createSlice } from "@reduxjs/toolkit";
import actToggleLikedProduct from "./act/actToggleLikedProduct";
import { LOADINGSTATE } from "@CTypes/shared";
import { TProduct } from "@CTypes/products";
import actgetWishlist from "./act/actgetWishlist";
import { logout } from "@Store/Auth/AuthSlice";

interface IWishlist{
    itemsId:number[];
    error:null | string;
    loading:LOADINGSTATE;
    totalProducts:TProduct[]
}
const initialState : IWishlist = {
    itemsId:[],
    error:null,
    loading:"idle",
    totalProducts:[]
}

const WishlistSlice = createSlice({
name:"wishlist",
initialState,
reducers:{},
extraReducers : builder => {
    builder.addCase(actToggleLikedProduct.pending, (state) => {
        state.error = null
    });
    builder.addCase(actToggleLikedProduct.fulfilled, (state,action) => {
        if(action.payload.type === 'remove'){
            state.itemsId = state.itemsId.filter(item => item !== action.payload.id)
            state.totalProducts = state.totalProducts.filter(item => item.id !== action.payload.id)
        } 
        else{
            state.itemsId.push(action.payload.id)
        }
    });
    builder.addCase(actToggleLikedProduct.rejected, (state,action) => {
        if(action.payload && typeof action.payload === 'string'){
            state.error = action.payload
        }
    });

    //wishlist
    builder.addCase(actgetWishlist.pending, (state) => {
        state.error = null
        state.loading = 'pending'
    });
    builder.addCase(actgetWishlist.fulfilled, (state,action) => {
        if(action.payload.type == 'productsFullInfo'){
            state.totalProducts = action.payload.data
        }
        else
        {
            console.log('first')
            state.itemsId = action.payload.data
            
        }
        state.error= null;
        state.loading = 'succeeded';
       
        

    });
    builder.addCase(actgetWishlist.rejected, (state,action) => {
        state.loading = 'failed'
        if(action.payload && typeof action.payload === 'string'){
            state.error = action.payload
        }
    });
    builder.addCase(logout,state => {
        state.itemsId = []
        state.totalProducts = []
        state.error = null
        state.loading = 'idle'
    })

}
});

export  {actToggleLikedProduct}
export default WishlistSlice.reducer;