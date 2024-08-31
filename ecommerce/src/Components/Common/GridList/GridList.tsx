
import LottieHandler from '@Components/Feedback/LottieHandler/LottieHandler';
import React from 'react'
import { Col, Row } from 'react-bootstrap'


type TProp<T> ={
    records:T[];
    renderItem: (item:T) => React.ReactNode;
}
type THasID = {
    id:number;
}
const GridList = <T extends THasID>({records,renderItem} : TProp<T>) => {
  return (
    <Row>
        {
           records.length > 0 ? records.map(item => (
            <Col xs={6} md={3} key={item.id} className='d-flex justify-content-center mb-5 mt-3'>
             {renderItem(item)}
            </Col>
          ))  : <LottieHandler type="Empty" message="Opps!! Sorry There Were no Product Found"/>
        }
    </Row>
  )
}

export default GridList