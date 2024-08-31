import { useAppSelector } from '@Store/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom'

const Auth = ({children}) => {
    const {accessToken} = useAppSelector(state => state.Auth)
    if(!accessToken){
        return <Navigate to="/login" />
    }
  return (
    <div>{children}</div>
  )
}

export default Auth