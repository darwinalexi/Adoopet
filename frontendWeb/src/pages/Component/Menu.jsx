import { Link } from "react-router-dom"

export const Menu=()=>{
    return(
<>
<div className="w-56 bg-orange-400 h-full fixed left-0 top-0">
     <nav className="fixed top-24 left-[2%]">
        <h1 className="font-semibold">Adoppet</h1>
        <ul >
            <li className="mt-10"><Link to="/perfil">Perfil</Link></li>
            <li className="mt-10"><Link to="/mascotas_adoptadas">mascotas Adoptadas</Link></li>
            <li className="mt-10"><Link to="/mascotas_por_adoptar">mascotas por  Adoptar</Link></li>
        </ul>
        <img src="../src/img/logo.png" className="w-36 relative top-20" />
     </nav>
</div>
</>
    )
}