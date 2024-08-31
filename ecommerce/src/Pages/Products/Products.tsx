import { GridList } from '@Components/Common'
import Heading from '@Components/Common/Heading/Heading'
import { Product } from '@Components/Ecommerce'
import Loading from '@Components/Feedback/Loading/Loading'
import useProducts from '@Hooks/useProducts'
import { Container } from 'react-bootstrap'

const Products = () => {

  const {error,loading,products,params} = useProducts()
 
  return (
    <Container>
      <Heading title={`${params.prefix} Products`}></Heading>
      <Loading status={loading} error={error} type='product'>
        <GridList records={products} renderItem={item => <Product {...item}/>} />
      </Loading>
      
    </Container>
  )
}

export default Products