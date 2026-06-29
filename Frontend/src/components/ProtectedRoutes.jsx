import {Navigate} from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRouter({children}){
    const {user, Loading} = useAuth();

    if(Loading){
        return(
            <div className="min-h-screen justify-center flex items-center bg-zinc-950">Loading...</div>
        )
    }
    if(!user){
        return <Navigate to ="/login" replace={true} />
    }
    return children;

}

export default ProtectedRouter;