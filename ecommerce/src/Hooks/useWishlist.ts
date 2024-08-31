import { useAppDispatch, useAppSelector } from '@Store/hooks'
import actGetProductsByCategory from '@Store/Products/act/actGetProductsByCategory'
import { cleanUp } from '@Store/Products/ProductsSlice'
import actgetWishlist from '@Store/Wishlist/act/actgetWishlist'
import  { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const useWishlist = () => {
    const {error,totalProducts,loading} = useAppSelector(state => state.Wishlist);
    const dispatch = useAppDispatch()

    useEffect(() => {
      
      dispatch(actgetWishlist("productsFullInfo"));
  
      return () => {
        
      }
    },[dispatch])
  return {error,totalProducts,loading}
}

export default useWishlist