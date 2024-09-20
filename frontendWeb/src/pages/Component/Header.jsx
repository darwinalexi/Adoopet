import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBell, faPlus, faClose, faUser, faPaw, faSignOutAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../utils/axiosClent";

import Swal from"sweetalert2"
import Creae_Pets from "./Modal/Create_Mascotas";
import { baseUrl } from "../utils/data";

const Header = () => {
  
  const [modal, setModal] = useState(false);
  const [selectPet, setSelectedPet] = useState(null); 
  const [mpendientes, setmascotas]= useState([])
  const [raza,setraza]=useState([])
  const [categoria, setcategoria]= useState([]);
  const [genero, setgenero]= useState([]);
  const [createpet, setcreate]= useState(false);
  const[crear, setcrear]= useState(null)
  const [borraradoppen, setboraradoppen]=  useState([]);
  const [adoptar, setadoptar]= useState([]);
  const[nombre, setNombre]= useState([])
  const [user, setuser]= useState([]);
  const [administrador, setadmini]= useState([])




  const openModal = (mpendientes) => {
    setSelectedPet(mpendientes);
    setboraradoppen(mpendientes.id) 
    
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };



const navigate = useNavigate();
  

  useEffect(()=>{
    listar_pendientes();
    listar_raza();
    listar_categoria();
    listar_gender();
    numbersuper();
    listar_user();
   },[])
 

  const listar_pendientes= async()=>{
    try {
      const listar= await axiosClient.get("/listar_adopciones")
       setmascotas(listar.data)      
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
    if (usuarios.length > 0) {
      const usuario = usuarios[0];
      setNombre(usuario.nombre);
    }
  }, []);


  const listar_raza=async()=>{
    try {
      const listar= await axiosClient.get("/listar_races")
      setraza(listar.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  const listar_user=async()=>{
    const listar= await axiosClient.get("listar")
    setuser(listar.data)
    console.log("usurios",listar.data)
  }
  const listar_categoria=async()=>{
    try {
      
      const categorias= await axiosClient.get("/listar_categories")
      setcategoria(categorias.data)
      console.log("categorias",categorias.data)
    } catch (error) {
      console.log(error)
    }
  }


 
  const adopt = async(id_mascota)=>{

    try {
    const adoptar= await axiosClient.put(`/adoptar/${id_mascota}`)
       setadoptar(adoptar.data.mensaje)
        Swal.fire({
          icon: "success",
          title: "Felicidades, Paso de Estar En Proceso A Adoptado ",
          showConfirmButton: true,
          timer: 2500
        })
           window.location.reload();
   } catch (error) {
    console.log("paila",error)
   }
  }
  const listar_gender=async()=>{
    try {
      
      const generos= await axiosClient.get("/listar_gender")
      setgenero(generos.data)
      console.log("genero",generos.data)
    } catch (error) {
      console.log(error)
    }
  }

 

  const [usuario, setTipo] = useState([]);
  const [numero, setnumero]= useState([])

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
    const tipo = usuarios ? usuarios.tipo : '';
    const nombre = usuarios ? usuarios.nombre:'';
    setTipo(tipo)
    setNombre(nombre)

  }, []);

  const borrar_adopcion_p= async(id_adopcion,id_mascota)=>{
  try {
 
    const  borrar = await axiosClient.delete(`/eliminar_adopcion/${id_adopcion}/${id_mascota}`)
    setboraradoppen(borrar.data.mensaje)
    console.log(borrar.data.mensaje)
    Swal.fire({
      icon: "success",
      title: "",
      text:borrar.data.mensaje,
      showConfirmButton: true,
      timer: 1500
    })
    console.log()
window.location.reload();
  } catch (e) {
    console.log(e)
  }
  }

  const close_session = async () => {
    localStorage.clear();
    navigate('/', { replace: true });
    window.location.reload();
  };

  const openpet = ()=>{
    setcreate(true)
   
  }
  
  const close_modal=()=>{
  setcreate(false)
  }
  
  const numbersuper= async()=>{
    try {
      const  response = await axiosClient.get('/numero_super');
      setnumero(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  

  const WhatsAppRedirect = (numero) => {

    const telefono = numero[0]?.telefono; // Obtiene el primer objeto del array y su propiedad 'telefono' 
    
    if (telefono) {
      const url = `https://wa.me/${telefono}`;
      window.open(url, '_blank');
    } 
  };
  return (
    <>
      <header className=" sm:w-[100%] lg:w-[100%]  absolute top-0  left-0 h-24 border-b border-b-[#1999a6] lg:border-b border-b-[#1999a6] h-16  z-30 ">
     <div className=" sm:w-[70%]  lg:absolute left-[15%]">
          {usuario==="SuperUsuario" &&(
          <>
          <div className=" grid grid-cols-4 w-[90%] gap-6 fixed right-[4%] lg:fixed top-0  w-[34%]  lg:w-[60%] lg:grid lg:grid-cols-4 lg:absolute  lg:left-[54%] b">
                      <div  className="sm:w-4 lg:w-[70%] mt-5">
                        <p>Adopciones pendientes</p>
                          <button onClick={openModal}><FontAwesomeIcon icon={faBell} color="#1999a6"/></button>
                        </div>
                      <div className="w-[90%] mt-3">
                        <p>Crear Mascota</p>
                      <p onClick={openpet}><FontAwesomeIcon icon={faPlus} color="#1999a6"/></p>
                      </div>
                        <div className=" w-[90%]  mt-6">
                        <h1>{nombre}</h1>
                        <FontAwesomeIcon icon={faUser} color="#1999a6"/>
                        </div>
                      <div onClick={close_session} className=" w-[90%]  mt-6">
                        <h1>Cerrar Sesion</h1>
                        <FontAwesomeIcon icon={faSignOutAlt}  color="#1999a6"/>;
                      </div>
          { createpet   &&(<Creae_Pets  onclose={close_modal}/>)}
      </div>
          </>
          )}
        
        {usuario==="Usuario" &&(
          <>
           <div className="grid grid-cols-2 gap-1 w-[16%] relative left-[93%]">
          <div className="h-1">
          <button  onClick={() => WhatsAppRedirect(numero)}>
            <FontAwesomeIcon icon={faWhatsapp} className="size-5" color="#1999a6" />;
            <h1>Comuniquese con  el SuperUsuario</h1>
            </button>
          </div>
                      <div onClick={close_session} className="w-4 relative left-[94%]" >
                        <h1>Cerrar Sesion</h1>
                        <FontAwesomeIcon icon={faSignOutAlt} color="#1999a6" />;
                      </div>
            </div>
          </>
        )}
        { usuario === "Administrador" &&(
          <>
          <div className="grid grid-cols-2 gap-1 w-[16%] relative left-[93%]">
              <div className="w-[90%] mt-3">
                            <p>Crear Mascota</p>
                          <p onClick={openpet}><FontAwesomeIcon icon={faPlus} color="#1999a6"/></p>
                </div>

                <div onClick={close_session} className="w-4 relative left-[94%]" >
                      <h1>Cerrar Sesion</h1>
                    <FontAwesomeIcon icon={faSignOutAlt} color="#1999a6" />;
                </div>
          </div>
          </>
        )}
       {usuario ==="Invitado"&&(
           <div onClick={close_session} className="w-4 relative left-[94%]" >
           <h1>Cerrar Sesion</h1>
         <FontAwesomeIcon icon={faSignOutAlt} color="#1999a6" />;
     </div>
       )}

     </div>

        {modal &&(
         <>
          <div className="overflow-y-scroll  border-y-2 rounded-xl border-x-2 lg:w-[29%] relative top-20   w-[78%]  lg:relative left-[25%] top-16 grid grid-cols-1 gap-7 bg-[#1999a6]  h-80 ">
          <button onClick={closeModal} className="absolute right-[10%] m-4 "><FontAwesomeIcon icon={faClose} className="size-8 mt-"/></button>
            <h3 className="text-center  mt-[8%]">Adopciones Pendientes</h3>
            <div className="h-23">
              {mpendientes .map((mascota)=>(
               <>
               <div className="h-[90%]   w-[100%]  mb-2 hover:border-b border-slate-200 hover:border-t border-slate-200 " >
                      <div className="grid grid-cols-2  w-[50] ">
                      <div className="grid grid-rows-2  gap-1 w-[100%] w-full ">
                        <p className="w-36 mt-4 ml-8 ">Nombre Mascota: {mascota.nombre_mascota}</p>
                        <img  src={`${baseUrl}/img/${mascota.foto}`} className="rounded-full  ml-6  relative bottom-[66%]" />
                        <p className="absolute top-[100%] mt-14 ml-12">Edad: {mascota.edad} años</p>
                      </div>
                     
                      <div className="">
                        <p  className="relative left-[10%] top-5   w-40"> Nombre del Adoptante: {mascota.nombre_usuario}</p>
                        <p  className=" w-40 relative left-[10%] top-8 "> Correo del Adoptante: {mascota.correo}</p>
                      
                        <div className="grid grid-cols-2 gap-5 relative left-[18%] top-[15%] mt-6 w-[70%] ">
                          <button  className="bg-white   rounded-xl  p-1 w-[113%]"onClick={()=>adopt( mascota.id_mascota)}>Adoptar Macota</button>
                          <button    className="bg-white rounded-xl   p-2 w-[100%]"  onClick={() => borrar_adopcion_p(mascota.id_adopcion,mascota.id_mascota)}>Borrar</button>
                      </div>
                      </div>

                      
                  </div>
               </div>
               
               </>
              ))}

              <div>
              
              </div>
            </div>
          </div>
         </>
        )}

       
      </header>
    </>
  );
};

export default Header;
