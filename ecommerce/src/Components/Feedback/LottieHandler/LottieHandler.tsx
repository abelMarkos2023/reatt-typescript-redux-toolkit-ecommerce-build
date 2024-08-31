import Lottie from 'lottie-react'
import NotFound from "@assets/LottieFiles/notFound.json"
import Empty from "@assets/LottieFiles/empty.json"
import Error from "@assets/LottieFiles/error.json"
import Loading from "@assets/LottieFiles/loading.json"
import Success from "@assets/LottieFiles/done.json"

import { Link } from 'react-router-dom'

const lottieFilesMap = {
    NotFound,
    Empty,
    Error,
    Loading,
    Success
    // Add more lottie files here
}

type TLottieHandlerProps = {
    type:keyof typeof lottieFilesMap;
    message?:"string"
}
const LottieHandler = ({type,message}:TLottieHandlerProps) => {
    return (
     <div className="notFound">
      <Lottie animationData={lottieFilesMap[type]}/>
      {message &&  <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <h3 className='mb-5'>
        {message}
        </h3>
        <Link style={{fontSize:"1.5rem"}} className='text-2xl' to='/' replace={true}>
      Back To Home Page
      </Link>
      
        </div>}
     </div>
    )
  }
  
  export default LottieHandler