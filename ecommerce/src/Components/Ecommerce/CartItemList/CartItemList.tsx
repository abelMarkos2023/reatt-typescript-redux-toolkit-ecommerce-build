import { TProduct } from '@CTypes/products'
import {useCallback} from 'react'
import CartItem from '../CartItem/CartItem'
import {useAppDispatch} from '@Store/hooks'
import {changeQty,removeItem} from "@Store/Cart/CartSlice"
type TProductsProps = TProduct[]
const CartItemList = ({products}:{products:TProductsProps}) => {
    const dispatch = useAppDispatch()

    const changeQtyHandler = useCallback((id:number,quantity:number) => {
        dispatch(changeQty({id,quantity}))
    },[dispatch])

    const removeItemHandler = useCallback((id:number) => {
        dispatch(removeItem({id}))
    },[dispatch])
    const list = products.map(p => <CartItem key = {p.id} {...p} changeQtyHandler={changeQtyHandler} removeItemHandler={removeItemHandler}/>)
  return (
    <div>
        {list}
    </div>
  )
}

export default CartItemList