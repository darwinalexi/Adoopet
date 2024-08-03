import { Navigate, Outlet } from "react-router-dom"

export const PrivateRouter=()=>{
    let userToken = localStorage.getItem('token');
    if (!userToken) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}