import axios from "axios"
import { useState } from "react"

type TStatus = 'idle' | 'checking' | "available" | 'notAvailable' | 'failed'

const useCheckEmailAvailabilityStatus = () => {
    const [emailAvailabilityStatus,setEmailAvailabilityStatus] = useState<TStatus>('idle')
    const [email,setEmail] = useState<null | string>(null)

    const checkEmailAvailability = async(mail:string) => {
        setEmail(mail)
        setEmailAvailabilityStatus('checking');

        try {
            const response = await axios.get('/users?email='+mail)
            if(!response.data.length){
                setEmailAvailabilityStatus('available')
            }else{
                setEmailAvailabilityStatus('notAvailable')
            }
        } catch (error) {
            setEmailAvailabilityStatus('failed')
        }
    }
  return {emailAvailabilityStatus,checkEmailAvailability,email}
}

export default useCheckEmailAvailabilityStatus