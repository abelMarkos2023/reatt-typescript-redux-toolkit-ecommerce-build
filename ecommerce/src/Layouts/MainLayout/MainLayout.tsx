import { Container } from 'react-bootstrap'
import styles from './styles.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Footer, Header } from '@Components/Common';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {

    const {container,wrapper} = styles;
  return (
    <Container className={container}>
        <Header></Header>
        <div className={wrapper}>
        <Outlet />
        </div>
        <Footer />
    </Container>
  )
}

export default MainLayout