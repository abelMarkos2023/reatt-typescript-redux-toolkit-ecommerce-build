import styles from './Footer.module.css'

const {footerContainer} = styles
const Footer = () => {
  return (
    <div className={footerContainer}>
        <p>2024 My eCommerce. &copy; All rights reserved.</p>
    </div>
  )
}

export default Footer