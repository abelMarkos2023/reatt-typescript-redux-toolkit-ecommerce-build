import styles from  './styles.modile.css'
import {Row,Col,ListGroup} from 'react-bootstrap'
import {NavLink,Outlet} from 'react-router-dom'
//const {profile} = styles;
const ProfileLayout = () => {
  return (
    <Row>
      <Col md={3}>
      <ListGroup>
        <ListGroup.Item as={NavLink} to='/profile' end>AccountInfo</ListGroup.Item>
        <ListGroup.Item as={NavLink} to='/profile/orders'>Orders</ListGroup.Item>

      </ListGroup>
      </Col>
      <Col>
      <Outlet />
      </Col>
    </Row>
  )
}

export default ProfileLayout