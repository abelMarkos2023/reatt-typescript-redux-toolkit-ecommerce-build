
import { getTotalCartQuantity } from '@Store/Cart/CartQuantitySelector'
import { actgetProductsByItems } from '@Store/Cart/CartSlice'
import { resetLoading } from '@Store/Order/OrderSlice'

import { useAppDispatch, useAppSelector } from '@Store/hooks'
import { useEffect } from 'react'
const useCart = () => {
    const dispatch = useAppDispatch();
  const {items,loading,error,totalProducts} = useAppSelector(state => state.Cart)
  const userAccessToken = useAppSelector(state => state.Auth.accessToken)

  const PlaceOrderStatus = useAppSelector(state => state.Order.loading)

  

  const cartWithQuantity = totalProducts.map(p => ({...p,quantity:items[p.id] || 0}))

  useEffect(() => {
    dispatch(actgetProductsByItems())
    return () => {
      dispatch(resetLoading())
    }
  },[])

  return {items,loading,error,totalProducts,cartWithQuantity,userAccessToken,PlaceOrderStatus}
}

export default useCart