import {Modal} from 'react-bootstrap'
import {  useAppSelector,useAppDispatch } from '@Store/hooks'
import actPlaceOrder from "@Store/Order/act/actPlaceOrder"
import styles from './styles.module.css'
import { Button } from 'react-bootstrap'

import {useState} from 'react'
import { clearingCartAfterPlacingOrder } from '@Store/Cart/CartSlice'
const CartSubtotal = ({userAccessToken}:{userAccessToken:string|null}) => {

  const cart = useAppSelector(state => state.Cart)
  const dispatch = useAppDispatch()

  const products = cart.totalProducts.map(p => ({...p,quantity:cart.items[p.id]}))

  const totalPrice = products.reduce((a,b) => {
    return a + (b.price * b.quantity)
  },0)

  const [show,setShow] = useState(false)
  const handleClose = () => setShow(!show)
  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header >
        <Modal.Title>Place Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Woo You're about To Compelete Your Purchase
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={() => {
          dispatch(actPlaceOrder(totalPrice)).unwrap().then(() => setShow(false))
          dispatch(clearingCartAfterPlacingOrder())
        }}>Continue</Button>
      </Modal.Footer>
    </Modal>
      <div className={styles.container}>
        <span>Subtotal :</span>
        <span>{totalPrice} EGP</span>
    </div>
    {userAccessToken && (
      <div className={styles.container}>
        <span></span>
      <Button size='lg' variant="info" style={{color:"white"}} onClick={() => setShow(true)}>Place Order</Button>
  </div>
    )}
    </>
  )
}

export default CartSubtotal