import { useAppSelector } from '@Store/hooks'

import { Navigate } from 'react-router-dom'

const Guest = ({children}) => {
    const {accessToken} = useAppSelector(state => state.Auth)
    if(accessToken){
        return <Navigate to="/" />
    }
  return (
    <div>{children}</div>
  )
}

export default Guest