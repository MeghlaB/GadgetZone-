import React, { useContext } from 'react'
import UseAuth from '../Hooks/UseAuth'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Provider/AuthProvider'


function Privetroutes({children}) {
    const {user,loading} = useContext(AuthContext)
    
    if(loading){
        return <div className='flex items-center justify-center mt-24'>
            <span className=" loading loading-spinner loading-lg"></span>
        </div>
    }
    if(user){
        return children
    }
  return <Navigate to={'/login'}></Navigate>
}

export default Privetroutes
