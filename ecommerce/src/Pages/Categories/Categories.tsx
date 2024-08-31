import { GridList } from '@Components/Common';
import Heading from '@Components/Common/Heading/Heading';
import { Category } from '@Components/Ecommerce'
import Loading from '@Components/Feedback/Loading/Loading';
import useCategories from '@Hooks/useCategories';
import { Container } from 'react-bootstrap'


const Categories = () => {
 const {records,error,loading} = useCategories()
  return (
    <Container>
      <Heading title="Categories"></Heading>
      <Loading status={loading} error = {error} type="category">
        <GridList records={records} renderItem = {record => <Category {...record}/>} />
      </Loading>
      
    </Container>
  )
}

export default Categories