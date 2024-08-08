import { SidebarHeader } from './Sidebar.Header';
import { SidebarLogo} from"./Sidebarlogo"
import { SidebarItem } from './Sidebaritemes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faDog, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export const Sidebar = () => {
  const [usuario, setUsuario] = useState('');
  const [openSidebar, setOpenSidebar] = useState(false);

  const openSidebars = () => {
    setOpenSidebar(true);

  };

  const closeSidebar = () => {
    setOpenSidebar(false);
  };

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
    const tipo = usuarios ? usuarios.tipo : '';
    setUsuario(tipo)
  }, []);
  return (
    <>
      <button onClick={openSidebars} className='fixed  left-0 z-30 lg:fixed left-3' >
        <FontAwesomeIcon icon={faBars}  color='#1999a6' className='size-7'/>
      </button>
      {openSidebar && (
        <>
          <div className="w-[18%] bg-[#1999a6] h-full fixed left-0 top-0 z-30">
            <nav className="fixed top-24 left-4">
              <button onClick={closeSidebar} className='relative bottom-16 left-[40%]'>
                <FontAwesomeIcon icon={faClose} className='size-7'/>
              </button>
              <SidebarHeader />
              <ul>
                {usuario === "Administrador" && (
                  <>
                    <SidebarItem to="/perfil">
                      <FontAwesomeIcon icon={faUser} className='mr-10'/> Perfil
                    </SidebarItem> 
                    <SidebarItem to="/mascotas_adoptadas"> <FontAwesomeIcon icon={faDog} className='size-8 mr-10'/>Mascotas Adoptadas </SidebarItem>
                    <SidebarItem to="/mascotas_por_adoptar"><FontAwesomeIcon icon={faDog} className='size-8 mr-10'/>Mascotas por Adoptar</SidebarItem>
                    <SidebarItem to="/categorias" >Categorias</SidebarItem>
                  </>
                )}

                {usuario === "Usuario" && (
                  <>
                    <SidebarItem to="/perfil">
                      <FontAwesomeIcon icon={faUser} /> Perfil
                    </SidebarItem>
                    <SidebarItem to="/adoptar"> <FontAwesomeIcon icon={faDog} className='size-8 mr-10'/>Adoptar Mascota </SidebarItem>
                    <SidebarItem to="/mascotas_por_adoptar"><FontAwesomeIcon icon={faDog} className='size-8 mr-10'/>Mascotas por Adoptar</SidebarItem>
                 </>
                )}
              </ul>
              <SidebarLogo />
            </nav>
          </div>
        </>
      )}
    </>
  );
};
