import styles from './styles.module.css'
import Logo from '../../../assets/cart.svg?react'
import { useAppSelector } from '@Store/hooks'

import {getTotalCartQuantity} from '@Store/Cart/CartSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const {basketContainer,basketQuantity,animate} = styles
const HeaderBasket = () => {

  const [isAnimate,setIsAnimate] = useState(false)
  const navigate = useNavigate()


  const cart = useAppSelector(getTotalCartQuantity)

  useEffect(() => {
    setIsAnimate(true)
   const debonse =  setTimeout(() => setIsAnimate(false), 1000)

   return () => {
    clearTimeout(debonse)
   }
  },[cart])
  return (
    <div className={basketContainer} onClick = {() => navigate('/cart')}>
      <Logo />
      
      <div className={`${basketQuantity} ${isAnimate ? animate :''}`}>{cart}</div>
    
    </div>
  )
}

export default HeaderBasket