import { LOADINGSTATE } from '@CTypes/shared'
import React from 'react'
import { CartSkeleton, CategorySkeleton, ProductSkeleton } from '../Skeletons'


type TProp = {
    status : LOADINGSTATE,
    error : null| string,
    children:React.ReactNode,
    type:"cart" | "product" | "category"
}
const skeletonsType =  {
    category : <CategorySkeleton />,
    product : <ProductSkeleton />,
    cart : <CartSkeleton />
}
const Loading = ({status,error,children,type} : TProp) => {
    if(status === 'pending'){
    return skeletonsType[type];
      
    }
    if(status === 'failed'){
        return <p>Error: {error}</p>
    }
  return (
    <>
    {
        children
    }
    </>
  )
}

export default Loading