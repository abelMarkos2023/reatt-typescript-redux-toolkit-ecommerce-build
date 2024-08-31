import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Logo from '../../../assets/wishlist.svg?react'
import LogoFill from '@assets/like-fill.svg?react'
import { useAppSelector } from '@Store/hooks'
import { useNavigate } from 'react-router-dom'

const {basketContainer,basketQuantity,animate} = styles

const HeaderWishlist = () => {
    const [isAnimate,setIsAnimate] = useState(false)
    const navigate = useNavigate()
  
    const wishlist = useAppSelector(state => state.Wishlist)
  
  
    useEffect(() => {
      setIsAnimate(true)
     const debonse =  setTimeout(() => setIsAnimate(false), 1000)
  
     return () => {
      clearTimeout(debonse)
     }
    },[wishlist])
    return (
      <div className={basketContainer} onClick = {() => navigate('/wishlist')}>
        <Logo />
        {wishlist.itemsId.length > 0 && <div className={`${basketQuantity} ${isAnimate ? animate :''}`}>{ wishlist.itemsId.length}</div>}
        
      </div>
    )
  }

export default HeaderWishlist