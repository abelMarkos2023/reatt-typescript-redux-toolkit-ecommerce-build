import { getTotalCartQuantity } from '@Store/Cart/CartQuantitySelector';
import { RootState } from './../index';
import { TProduct } from '@CTypes/products';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import actgetProductsByItems from './act/actgetProductsByItems';
import { LOADINGSTATE } from '@CTypes/shared';

interface ICart{
    items:{[key:string]:number};
    totalProducts: TProduct[],
    error: null | string;
    loading:LOADINGSTATE;
}

const initialState : ICart = {
    items:{},
    totalProducts:[],
    loading:"idle",
    error:null
} 

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state,action) => {
            const id = action.payload
            if(state.items[id]){
                state.items[id]++
            }else{
                state.items[id] = 1
            }
        },
        changeQty : (state,action) => {
            state.items[action.payload.id] = action.payload.quantity;
        },
        removeItem : (state,action) => {
            // delete state.items[action.payload.id]
            const items = state.items;
            delete items[action.payload.id]
            state.items = items
            // const newItems :{[key:string]:number} = {}
            // Object.keys(state.items).filter(item => item !== action.payload.id).map(item => newItems[item] = state.items[item] )
            // state.items = newItems

            state.totalProducts = state.totalProducts.filter(pro => pro.id !== action.payload.id)
        },
        clearingCartAfterPlacingOrder : state => {
            state.items = {},
            state.totalProducts = []
        }
    },
    extraReducers : builder => {
        builder.addCase(actgetProductsByItems.pending, state => {
            state.loading = 'pending';
            state.error=null
        })
        builder.addCase(actgetProductsByItems.fulfilled, (state,action) => {
            state.loading='succeeded'
            state.totalProducts = action.payload
        })
        builder.addCase(actgetProductsByItems.rejected,(state,action) => {
            state.loading='failed';
            if(action.payload && typeof action.payload === 'string'){
                state.error = action.payload
            }
        })
    }

})

// const getTotalCartQuantity = createSelector((state:RootState) => state.Cart.items,(items) => {
//     console.log('function Firing')
//     return Object.values(items).reduce((total, quantity) => total + quantity, 0);
// }) 

export {getTotalCartQuantity,actgetProductsByItems}
export const {addToCart,changeQty,removeItem,clearingCartAfterPlacingOrder} = cartSlice.actions;

export default cartSlice.reducer