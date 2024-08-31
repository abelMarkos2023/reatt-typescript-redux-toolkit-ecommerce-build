import Heading from "@Components/Common/Heading/Heading";
import {useAppDispatch,useAppSelector} from "@Store/hooks"
import actgetUserOrders from "@Store/Order/act/actgetUserOrders";
import {resetLoading} from "@Store/Order/OrderSlice"
import { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from 'react-bootstrap'

const Orders = () => {
const dispatch = useAppDispatch();
const {items} = useAppSelector(state => state.Order)
const [pro,setPro] = useState({})
const [show,setShow] = useState(false)
 

const handleClose = () => setShow(false)
const openModal = (element) => {
  setShow(true)
  setPro(element)
}
useEffect(()=>{
  dispatch(actgetUserOrders())
  return () => {
    dispatch(resetLoading())
  }
},[])
  return (
    <Container>
       <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header >
        <Modal.Title>{pro?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table striped hover bordered>
        <thead>
          <tr>
          <th>Product Image</th>
            <th>Unit Price</th>
            <th>Number of Units</th>
            <th>Total Units Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src={pro?.img}/></td>
            <td>{pro?.price}</td>
            <td>{pro?.quantity}</td>
            <td>{pro?.price * pro?.quantity}</td>

          </tr>
        </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>Close Modal</Button>
        
      </Modal.Footer>
      </Modal>
      <Heading title='Your Orders'/>
      <Table striped hover bordered>
        <thead>
          <tr>
           
            <th>Order Number</th>
            <th>items</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            items?.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.items.map(el => (
                  <li key={el.id} onClick={() => openModal(el)}>
                    <span style={{fontSize:"1.2rem",cursor:"pointer",textDecoration:"underline"}}>"/"Show Detail</span>
                  </li>
                ))}</td>
                <td>{item.subTotal}</td>
              </tr>
              
            ))
          }
        </tbody>
      </Table>
    </Container>
  )
}

export default Orders