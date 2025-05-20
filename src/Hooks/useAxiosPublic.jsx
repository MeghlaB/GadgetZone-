import axios from 'axios'


const axiosPublic= axios.create({
   
    baseURL:"http://localhost:5000",
    // baseURL:"https://gadget-zone-server-ashy.vercel.app",
    withCredentials:true,
  
})

function useAxiosPublic() {
  return axiosPublic
}

export default useAxiosPublic
