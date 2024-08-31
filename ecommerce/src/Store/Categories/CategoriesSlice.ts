import { createSlice } from "@reduxjs/toolkit";
import actgetCategories from "./act/actgetCategories";
import { TCategory } from "@CTypes/categories";
import { LOADINGSTATE } from "@CTypes/shared";

interface ICategoriesState{
    records : TCategory[],
    loading: LOADINGSTATE,
    error: string | null,
}
const initialState : ICategoriesState = {
    records:[],
    loading:'idle',
    error:null
}

const CategoriesSlice = createSlice({
    initialState,
     name: 'categories',
    reducers: {},
    extraReducers : builder => {
        builder.addCase(actgetCategories.pending, state => {
            state.loading = "pending"
            state.error = null
        })

        builder.addCase(actgetCategories.fulfilled, (state,action) => {
            state.loading = "succeeded"
            state.records = action.payload
        })
        builder.addCase(actgetCategories.rejected, (state,action) => {
            state.loading = "failed"
            if(action.payload && typeof action.payload === 'string'){
                state.error = action.payload

            }
        })
    }
})
export {actgetCategories}
export default CategoriesSlice.reducer 