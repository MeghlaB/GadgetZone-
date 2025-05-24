
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'

export default function userAdmin() {
  const {user} =useContext(AuthContext)
  // console.log(user)
  
const {data: isAdmin ,isLoading: isAdminLoading } = useQuery({
  queryKey:[user?.email ,'isAdmin'],
  queryFn:async ()=>{
    const result = await axios.get(`http://localhost:5000/users/admin/${user.email}`)
    // console.log(result.data)
    return result.data?.admin
  }
})

  return[isAdmin , isAdminLoading]
}
