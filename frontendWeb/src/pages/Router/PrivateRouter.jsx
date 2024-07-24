import { Navigate, Outlet } from "react-router-dom"

export const PrivateRouter=()=>{
    let userToken = localStorage.getItem('token');
    
    // Si no hay token, redirige al usuario a la página de inicio o login
    if (!userToken) {
        return <Navigate to="/" />;
    }

    // Si hay un token, permite el acceso a las rutas protegidas renderizando Outlet
    return <Outlet />;
}