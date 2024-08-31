import { TProduct } from '@CTypes/products'
import { LOADINGSTATE } from '@CTypes/shared'
import {createSlice} from '@reduxjs/toolkit'
import actGetProductsByCategory from './act/actGetProductsByCategory'

interface IProductState {
    records:TProduct[],
    error:string | null,
    loading:LOADINGSTATE
}

const initialState:IProductState = {
records:[],
error:null,
loading:'pending'
}

const ProductsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        cleanUp: state => {
            state.records = [];
            state.error = null;
            state.loading = 'idle';
        }
    },
    extraReducers: builder => {
        builder.addCase(actGetProductsByCategory.pending, state => {
            state.loading = 'pending';
            error:null
        })
        builder.addCase(actGetProductsByCategory.fulfilled, (state,action) => {
            state.loading='succeeded'
            state.records = action.payload
        })
        builder.addCase(actGetProductsByCategory.rejected,(state,action) => {
            state.loading='failed';
            if(action.payload && typeof action.payload === 'string'){
                state.error = action.payload
            }
        })
    }
})

export const {cleanUp} = ProductsSlice.actions

export default ProductsSlice.reducer;