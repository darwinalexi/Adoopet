import { SidebarHeader} from"./Sidebar.Header"
import { SidebarLogo } from "./Sidebarlogo";
import { SidebarItem } from './Sidebaritemes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faDog, faUser, faSyringe, faBuilding, faCity, faUsers, faTag, faPaw  } from '@fortawesome/free-solid-svg-icons';
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
    setUsuario(tipo);
  }, []);

  return (
    <>
      <button onClick={openSidebars} className='fixed left-0 z-30 lg:fixed left-3'>
        <FontAwesomeIcon icon={faBars} color='#1999a6' className='size-7'/>
      </button>
      {openSidebar && (
        <div className="w-[18%] bg-[#1999a6] h-screen fixed left-0 top-0 z-30 flex flex-col">
          <nav className="flex flex-col h-full">
         
            <div className="flex-1 h-full overflow-y-auto bg-[#1999a6] ">
            <button onClick={closeSidebar} className='self-end mt-4 mr-4'>
              <FontAwesomeIcon icon={faClose} className='size-7'/>
            </button>
              <ul>
          
                {usuario === "SuperUsuario" && (
                  <>
                   
                    <SidebarItem to="/perfil">
                      <FontAwesomeIcon icon={faUser} className='mr-5'/> Perfil
                    </SidebarItem> 

                    <SidebarItem to="/mascotas_adoptadas">
                      <FontAwesomeIcon icon={faDog} className='size-8 mr-6'/>Mascotas Adoptadas
                    </SidebarItem>

                    <SidebarItem to="/mascotas_por_adoptar">
                      <FontAwesomeIcon icon={faDog} className='size-8 mr-5'/>Mascotas por Adoptar
                    </SidebarItem>
                    
                    <SidebarItem to="/categorias">
                    <FontAwesomeIcon icon={faTag} className='size-8 mr-5'/>Categorias</SidebarItem>

                    <SidebarItem to="/user" > 
                      <FontAwesomeIcon icon={faUsers} className='size-8 mr-5'/>
                      Usuarios
                    </SidebarItem>

                    <SidebarItem to="/races">
                    <FontAwesomeIcon icon={faPaw} className='size-8 mr-5'/> Razas
                    </SidebarItem>

                    <SidebarItem to="/Municipios">
                    <FontAwesomeIcon icon={faCity} className='size-8 mr-5'/>  Municipios
                    </SidebarItem>

                    <SidebarItem to="/Departamento">
                    <FontAwesomeIcon icon={faBuilding} className='size-8 mr-5'/>Departamento
                    </SidebarItem>

                    <SidebarItem to="/Vacunas">
                    <FontAwesomeIcon icon={faSyringe} className='size-8 mr-5'/> Vacunas
                    </SidebarItem>
                  </>
                )}

                {usuario === "Usuario" && (
                  <>
                    <SidebarItem to="/perfil">
                      <FontAwesomeIcon icon={faUser} /> Perfil
                    </SidebarItem>
                    <SidebarItem to="/adoptar">
                      <FontAwesomeIcon icon={faDog} className='size-8 mr-10'/>Adoptar Mascota
                    </SidebarItem>
                    <SidebarItem to="/mascotas_por_adoptar">
                      <FontAwesomeIcon icon={faDog} className='size-8 mr-10'/>Mascotas por Adoptar
                    </SidebarItem>
                  </>
                )}
                {usuario == "Administrador" &&(
                  <>
                    <SidebarItem to="/perfil">
                      <FontAwesomeIcon icon={faUser} /> Perfil
                    </SidebarItem>
                    
                    <SidebarItem to="/adoptar">
                      <FontAwesomeIcon icon={faDog} className='size-8 mr-10'/>Adoptar Mascota
                    </SidebarItem>
                    <SidebarItem to="/mascotas_por_adoptar">
                      <FontAwesomeIcon icon={faDog} className='size-8 mr-5'/>Mascotas por Adoptar
                    </SidebarItem>
                  </>
                )}
              </ul>
              <SidebarLogo />
            </div>
    
          </nav>
        </div>
      )}
    </>
  );
};
