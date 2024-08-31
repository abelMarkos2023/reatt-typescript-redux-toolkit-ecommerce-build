import { Form, Button } from "react-bootstrap";
import {memo} from 'react'
import styles from "./styles.module.css";
import { TProduct } from "@CTypes/products";
import ProductFullInfo from "../ProductFullInfo/ProductFullInfo";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;
type TCartItemProps = TProduct & {
  changeQtyHandler : (id:number,qty:number) => void;
  removeItemHandler : (id:number) => void

}
const CartItem = memo(({title,price,img,id,max,quantity,changeQtyHandler,removeItemHandler}:TCartItemProps) => {

  const quantityOption = Array(max).fill(0).map((_,idx) => {
    const pQuantity = ++idx;
    return <option key={idx} value={pQuantity} selected={quantity == pQuantity}>{pQuantity}</option>
  })

  const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    const qty = +event.target.value;
    changeQtyHandler(id,qty);
  }
  return (
    <div className={cartItem}>
     
     <ProductFullInfo title={title} img={img} price={price} direction="column" style={{gap:"2px"}}>
     <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
     </ProductFullInfo>
     

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select aria-label="Default select example" onChange={handleChange}>
          {quantityOption}
        </Form.Select>
      </div>
    </div>
  );
});

export default CartItem;