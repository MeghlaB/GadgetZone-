import React, { useContext } from 'react'


import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../Provider/AuthProvider'
import userSeller from '../Hooks/userSeller'

export default function sellerRoute({children}) {
    const {user,loading} = useContext(AuthContext)
    const [isseller,issellerLoading] = userSeller()
    const location =  useLocation()

    if(loading || issellerLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }

if(user && isseller){
    return children
}

  return (
    <Navigate to={'account/login'} state={{from: location.pathname }}></Navigate>
  )
}