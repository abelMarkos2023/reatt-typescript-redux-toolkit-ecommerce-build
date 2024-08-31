import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@CTypes/products";
import { addToCart } from "@Store/Cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@Store/hooks";
import { memo, useEffect, useState } from "react";
import LikeSVG from '@assets/like.svg?react'
import LikeFillSVG from '@assets/like-fill.svg?react'
import { actToggleLikedProduct } from "@Store/Wishlist/WishListSlice";
import actgetWishlist from "@Store/Wishlist/act/actgetWishlist";
import ProductFullInfo from "../ProductFullInfo/ProductFullInfo";
const { product, productImg,wishlistBtn } = styles;

const Product = memo(({id,title,img,price,quantity,max}:TProduct) => {

  const [disabled,setDisabled]= useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const reamaining = max - quantity;
  const hasReachedLimit = reamaining <= 0;
  const wishlist = useAppSelector(state => state.Wishlist)
  //const {user} = useAppSelector(state => state.Auth)
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    //dispatch(actgetWishlist('productIds'))
    if(!disabled){
      return
    } 
    const timeout = setTimeout(() => {
      setDisabled(false)
    },900)

    return () => clearTimeout(timeout)  // cleanup function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[disabled])
  const handleAddToCart = () => {
   setDisabled(true)
    dispatch(addToCart(id))
  }

  const handleLike = () => {
    
    if(isLoading){
      return;
    }
    console.log('firing')
    setIsLoading(true)
    dispatch(actToggleLikedProduct(id)).unwrap().then(() => setIsLoading(false)).catch(() => setIsLoading(false))
  }
  console.log('product firing')
  return (
    <div className={product}>
      <div className={wishlistBtn} onClick = {handleLike}>
       {isLoading ? <Spinner animation="border" size="sm" variant="primary" /> : wishlist?.itemsId?.includes(id) ? <LikeFillSVG /> : <LikeSVG />} 
      </div>
      <ProductFullInfo title={title} price={price} img={img} direction="row" style={{gap:'2px'}}>
      <p>
        {reamaining > 0 ? `you can add  (${reamaining}) items of this product ` : 'You\'ve Reached The Maximum Purcheses allowed on this product' }
        </p>
      <Button 
        disabled={disabled || hasReachedLimit} 
        onClick={handleAddToCart} 
        variant="info" 
        style={{ color: "white" }}>
        {
        disabled ? <><Spinner size="sm" animation="border" /> <span className="ml-1">Loading</span></> : 'Add to cart'
        }
      </Button>
      </ProductFullInfo>
      
    </div>
  );
});

export default Product;