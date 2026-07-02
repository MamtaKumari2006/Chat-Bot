import {Navigate} from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRouter({children}){
    const {user, loading} = useAuth();

    if(loading){
        return(
            <div className="min-h-screen justify-center flex items-center bg-zinc-950">Loading...</div>
        )
    }
    if(!user){
        return <Navigate to ="/login" replace />
    }
    return children;

}

export default ProtectedRouter;