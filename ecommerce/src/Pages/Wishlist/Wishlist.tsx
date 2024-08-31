import { GridList } from '@Components/Common'
import Heading from '@Components/Common/Heading/Heading'
import { Product } from '@Components/Ecommerce'
import Loading from '@Components/Feedback/Loading/Loading'
import useWishlist from '@Hooks/useWishlist'
import { Container } from 'react-bootstrap'


const Wishlist = () => {
    const {error,totalProducts,loading} = useWishlist()
  return (
    <Container>
    <Heading title='Your Wishlist'></Heading>
    <Loading status={loading} error={error}>
      <GridList records={totalProducts} renderItem={item => <Product {...item}/>} />
    </Loading>
    
  </Container>
  )
}

export default Wishlist