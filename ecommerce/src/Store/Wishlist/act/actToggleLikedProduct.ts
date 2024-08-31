import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@Store/index";
import axios from "axios";

const actToggleLikedProduct = createAsyncThunk(
    'wishlist/actToggleLikedProduct',
    async (id:number,thunkAPI) => {
        const {rejectWithValue,getState} = thunkAPI
        const {Auth:{user}} = getState() as RootState
        console.log(id)
        
        try {
            const response = await axios.get(`/wishlist?userId=${user.id}&itemId=${id}`);
            if(response.data.length > 0){
             await axios.delete(`/wishlist/${response.data[0].id}`)
                return {type:"remove",id}
            }
            else{
                await axios.post('/wishlist',{userId:user.id,itemId:id})
                return {type:"add",id}
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message)
            }
            return rejectWithValue('An Unexpected Error Accured')
        }
    })
export default actToggleLikedProduct