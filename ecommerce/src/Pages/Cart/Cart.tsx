import Heading from '@Components/Common/Heading/Heading'
import { CartItem, CartSubtotal } from '@Components/Ecommerce'
import CartItemList from '@Components/Ecommerce/CartItemList/CartItemList'
import Loading from '@Components/Feedback/Loading/Loading'
import LottieHandler from '@Components/Feedback/LottieHandler/LottieHandler'
import useCart from '@Hooks/useCart'

const Cart = () => {
  const {loading,error,totalProducts,cartWithQuantity,userAccessToken,PlaceOrderStatus} = useCart()
  return (
    <>
    <Heading title='Your Cart'></Heading>
   <Loading status={loading} error={error} type="cart">
    <CartItemList products={cartWithQuantity} />
   </Loading>
   {totalProducts.length > 0 ? <CartSubtotal  userAccessToken={userAccessToken}/>: <LottieHandler type={PlaceOrderStatus === 'succeeded' ?'Success':"Empty"} message={PlaceOrderStatus === "succeeded" ? "Order Placed Successfully":"Your Cart Is Empty Go To Product Page And Add Some Products"} />}
    
    </>
  )
}

export default Cart