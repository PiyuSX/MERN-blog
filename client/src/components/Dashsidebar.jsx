import { Link } from "react-router-dom"
import { User, ArrowRight } from 'lucide-react'
import useSignout from "../hooks/useSignout.js"
import useUserStore from "../store/userStore.js"

const Dashsidebar = ({ tab }) => {
  const { user } = useUserStore();
  const { signout } = useSignout();

  return (
    <div className="font-semibold bg-[var(--bg-colour)] text-[var(--text-colour)] border border-[var(--border-colour)] rounded flex flex-col gap-2 p-4 m-2 md:w-56 md:min-h-screen">
        <div className={`hover:text-[var(--primary-colour)] hover:bg-[var(--hover-bg-colour)] p-2 rounded ${tab === 'profile' ? 'bg-[var(--hover-bg-colour)] text-[var(--primary-colour)]' : ''}`}>
        <Link to="/dashboard?tab=profile" className=" cursor-pointer flex items-center gap-3"><User className="inline" />
        Profile
        <span className="text-[13px] text-[var(--text-muted-colour)] bg-[var(--bg-colour)] rounded-sm px-2">
          {user.isAdmin ? 'Admin' : 'User'}
          </span> </Link>
        </div>
       <div onClick={signout} className="hover:text-[var(--primary-colour)] hover:bg-[var(--hover-bg-colour)] p-2 rounded  cursor-pointer flex items-center gap-3">
      <ArrowRight className="inline" /> SignOut
       </div>
    </div>
  )
}

export default Dashsidebar