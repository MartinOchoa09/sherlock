import { Outlet, Navigate } from "react-router-dom";

function Protected({isLoged}) {
    return ( 
        isLoged ? <Outlet/> : <Navigate to={"/"}/>
     );
}

export default Protected;