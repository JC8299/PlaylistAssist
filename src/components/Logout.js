import { signOut } from "next-auth/react";

function Logout() {
    return (
        <button 
            className="rounded-full bg-[#1db954]"
            onClick={() => {signOut()}}
        >
            Sign Out
        </button>
    )
}

export default Logout;