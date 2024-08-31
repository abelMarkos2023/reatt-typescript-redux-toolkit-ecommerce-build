import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import { TCategory } from '@CTypes/categories';
const { category, categoryImg, categoryTitle } = styles;

// interface IProp{
//   id:number,
//   title:string,
//   prefix:string,
//   img:string
// }
const Category = ({id,title,prefix,img} : TCategory) => {
  return (
    <Link to = {`/products/${prefix}`} className={category}>
    <div className={categoryImg}>
      <img
        src={img}
        alt={title}
      />
    </div>
    <h4 className={categoryTitle}>{title}</h4>
  </Link>
  )
}

export default Category