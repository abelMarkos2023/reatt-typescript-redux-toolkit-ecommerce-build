import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import styles from './styles.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { HeaderBasket } from '@Components/Ecommerce';
import HeaderWishlist from '@Components/Ecommerce/HeaderWishlist/HeaderWishlist';
import { useAppDispatch, useAppSelector } from '@Store/hooks';
import { logout } from '@Store/Auth/AuthSlice';
import { useEffect } from 'react';
import actgetWishlist from '@Store/Wishlist/act/actgetWishlist';
const {headers,logo,right,top,basket,wishlist} = styles;
const Header = () => {

  const dispatch = useAppDispatch()
  const {user,accessToken} = useAppSelector(state => state.Auth)
  const navigate = useNavigate()

  const logoutUser = () => {
    dispatch(logout())
    navigate('/login')
  }

  useEffect(()=> {
    if(accessToken){
      dispatch(actgetWishlist("productIds"))

    }
  },[accessToken])
  return (
<header className={`${headers}`}>
    <div className={`${top} mt-4 mb-4 `}>
    <div className={logo}>
        <h1><span>Our</span><Badge bg='info'>Shop</Badge></h1>
    </div>
    <div className={right}>
      <div className={wishlist}>
        <HeaderWishlist />
        <span>Wishlist</span>
      </div>
    <div className={basket}>
    <HeaderBasket />
    <span>Cart</span>
    </div>
    </div>
    </div>
    <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand as={NavLink} to="/">My eCommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
            <Nav.Link as = {NavLink} to ="/products/men">Products</Nav.Link>
            <Nav.Link as={NavLink} to="about-us">AboutUs</Nav.Link>

          </Nav>
          <Nav className="d-flex gap-2 align-items-center">
            {
              Object.keys(user || {}).length > 0 ? (<NavDropdown title={user.firstname.concat(`-${user.lastname}`)} id="basic-nav-dropdown">
                <NavDropdown.Item >{user?.email}</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='profile/orders'>
                 Orders
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='profile' end>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
               
                <NavDropdown.Item  onClick={logoutUser}>
                 Logout
                </NavDropdown.Item>
              </NavDropdown>):(<>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              </>)
            }
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header