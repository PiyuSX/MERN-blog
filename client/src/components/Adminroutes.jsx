import useUserStore from "../store/userStore.js"
import { Outlet, Navigate } from "react-router-dom"


const Adminroutes = () => {
    const { user } = useUserStore()
  return user && user.isAdmin ? <Outlet /> : <Navigate to={'/signin'} />
}

export default Adminroutes
