import styles from './styles.module.css'
type TProductFullInfoProps = {
    title:string;
    img:string;
    price:number;
    direction:"row" | "column";
    children : React.ReactNode;
    style : React.CSSProperties;
}

const ProductFullInfo = ({title,img,price,children,direction}:TProductFullInfoProps) => {
  return (
    <div className={styles[`product-${direction}`]}>
    <div className={styles[`productImg-${direction}`]}>
      <img
        src={img}
        alt={title}
      />
    </div>
    <div className={styles[`productInfo-${direction}`]}>
      <h2>{title}</h2>
      <h3>{price} EGP</h3>
    
        {children}</div>
    </div>
  )
}

export default ProductFullInfo