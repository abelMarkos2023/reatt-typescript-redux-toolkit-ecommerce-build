import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import NotFound from "@assets/LottieFiles/notFound.json"
import LottieHandler from '@Components/Feedback/LottieHandler/LottieHandler'
const Error404 = () => {
  return (
   <div className="notFound">
  <LottieHandler type="NotFound"/>
    <Link to='/' replace={true}>
    Back To Home Page
    </Link>
   </div>
  )
}

export default Error404