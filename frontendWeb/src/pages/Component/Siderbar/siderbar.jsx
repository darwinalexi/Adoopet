import { SidebarHeader } from './Sidebar.Header';
import { SidebarLogo } from './Sidebarlogo';
import { SidebarItem } from './Sidebaritemes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export const Sidebar = () => {
  const [usuario, setTipo] = useState('');
 
  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
    if (usuarios.length > 0) {
      const usuario = usuarios[0];
      setTipo(usuario.tipo || 'Invitado');
    }
  }, [localStorage]);
  

  return (
    <>
      <div className="w-56 bg-orange-400 h-full fixed left-0 top-0">
        <nav className="fixed top-24 left-[2%]">
          <SidebarHeader />
          <ul>
          {usuario=== "Administrador" && (
            <>
           <SidebarItem to="/perfil"><FontAwesomeIcon icon={faUser} /> Perfil</SidebarItem>
            <SidebarItem to="/mascotas_adoptadas">Mascotas Adoptadas</SidebarItem>
            </>
          )}
            

            {usuario==="Usuario" &&(
            <>
             <SidebarItem to="/perfil"><FontAwesomeIcon icon={faUser} /> Perfil</SidebarItem>
             <SidebarItem to="/mascotas_por_adoptar">Mascotas por Adoptar</SidebarItem>
             <SidebarItem to="/adoptar">Adoptar Mascota</SidebarItem>
            </>
            )}
           
          </ul>
          <SidebarLogo />
        </nav>
      </div>
    </>
  );
};
