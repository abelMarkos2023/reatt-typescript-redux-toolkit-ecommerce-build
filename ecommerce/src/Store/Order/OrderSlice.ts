import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@CTypes/orders'
import actPlaceOrder from './act/actPlaceOrder'
import { LOADINGSTATE } from '@CTypes/shared';
import actgetUserOrders from './act/actgetUserOrders';

interface IOrderSlice {
id:number;
items:TOrder[];
loading:LOADINGSTATE;
error:string|null
}
const initialState : IOrderSlice = {}
const OrderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        resetLoading: state => {
            state.loading = "idle"
        }
    },
    extraReducers : builder => {
        builder.addCase(actPlaceOrder.pending, state => {
            state.loading = "pending"
        });
        builder.addCase(actPlaceOrder.fulfilled, (state,action) => {
            state.loading = 'succeeded';
            state.items = action.payload
        });
        builder.addCase(actPlaceOrder.rejected, (state,action) => {
            state.loading = "failed";
            state.error = action?.payload
        })

        //get Orders 
        builder.addCase(actgetUserOrders.pending, state => {
            state.loading = "pending"
        });
        builder.addCase(actgetUserOrders.fulfilled, (state,action) => {
            state.loading = 'succeeded';
            state.items = action.payload
        });
        builder.addCase(actgetUserOrders.rejected, (state,action) => {
            state.loading = "failed";
            state.error = action?.payload
        })
    }
});

export const {resetLoading} = OrderSlice.actions

export default OrderSlice.reducer;