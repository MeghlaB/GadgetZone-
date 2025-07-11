import axios from 'axios'


const axiosPublic= axios.create({

    // baseURL:"https://gadget-zone-server-kappa.vercel.app",
    baseURL:"https://gadget-zone-server-kappa.vercel.app",
    withCredentials:true,
  
})

function useAxiosPublic() {
  return axiosPublic
}

export default useAxiosPublic
