import { useAppDispatch, useAppSelector } from '@Store/hooks'
import actGetProductsByCategory from '@Store/Products/act/actGetProductsByCategory'
import { cleanUp } from '@Store/Products/ProductsSlice'
import  { useEffect } from 'react'

import { useParams } from 'react-router-dom'

const useProducts = () => {
    const {error,records,loading} = useAppSelector(state => state.Products);
  const {items} = useAppSelector(state => state.Cart)
  const products = records.map(item => ({
    ...item,quantity:items[item.id] ?? 0
  }))
  const dispatch = useAppDispatch()
  const params = useParams();
  useEffect(() => {
    let prefix;
    if(params.prefix && typeof params.prefix === 'string'){
      prefix = params.prefix.toLowerCase();
      dispatch(actGetProductsByCategory(prefix));
    }
    

    return () => {
      dispatch(cleanUp())
    }
  },[dispatch])

  return {error,records,loading,items,products,params}
}

export default useProducts