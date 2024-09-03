import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBell, faPlus, faClose, faUser, faPaw, faSignOutAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../utils/axiosClent";

import Swal from"sweetalert2"
import Creae_Pets from "./Modal/Create_Mascotas";

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
    listar_admin()

    listar_user();
   },[])
 

  const listar_pendientes= async()=>{
    try {
      const listar= await axiosClient.get("/listar_adopciones")
       setmascotas(listar.data)
        console.log("datos67", listar.data)
      
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
    console.log("adopcion",adoptar.data.mensaje)
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

  const listar_admin=async()=>{
    try {
      
      const admin= await axiosClient.get("/administrador")
     
      const telefonoAdmin = admin.data[0].telefono;
      setnumero(telefonoAdmin)

      
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

  const WhatsAppRedirect = (numero) => {
    const url = `https://wa.me/${numero}`;
    window.open(url, '_blank');
};
  return (
    <>
      <header className=" sm:w-[30%] lg:w-[100%]  absolute top-0  left-0 h-24 border-b border-b-[#1999a6] lg:border-b border-b-[#1999a6] h-16  z-30 ">
     <div className=" sm:w-[70%]  lg:absolute left-[15%]">
          {usuario==="Administrador" &&(
          <>
          <div className=" grid grid-cols-4 w-[90%] gap-6 fixed right-[4%] lg:fixed top-0  ww-[34%]  lg:w-[60%] lg:grid lg:grid-cols-4 lg:absolute  lg:left-[54%] b">
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
           <div>
          <div className="h-7">
          <button  onClick={() => WhatsAppRedirect(numero)}>
            <FontAwesomeIcon icon={faWhatsapp} className="size-11" color="#1999a6" />;
            <h1>Comuniquese con  el Administrador</h1>
            </button>
          </div>
                      <div onClick={close_session} className="w-4 relative left-[94%]" >
                        <h1>Cerrar Sesion</h1>
                        <FontAwesomeIcon icon={faSignOutAlt} color="#1999a6" />;
                      </div>
            </div>
          </>
        )}
         

     </div>

        {modal &&(
         <>
          <div className="overflow-y-scroll  border-y-2 rounded-xl border-x-2 lg:w-[29%] relative top-20   w-[78%]  lg:relative left-[25%] top-16 grid grid-cols-1 gap-7 bg-[#1999a6]  h-80 ">
          <button onClick={closeModal} className="absolute right-[12%]"><FontAwesomeIcon icon={faClose} className="size-8 mt-"/></button>
            <h3>Adopciones Pendientes</h3>
            <div className="h-23">
              {mpendientes .map((mascota)=>(
               <>
               <div className="h-auto mt-7  w-[60%]  hover:border-b border-slate-200 hover:border-t border-slate-200 " >
                      <div className="grid grid-cols-2  w-[50%] w-full">
                      <div className="grid grid-cols-2 w-[100%] w-full">
                        <p className="w-36 mt-4 ">Nombre Mascota: {mascota.nombre_mascota}</p>
                        <p  className="relative left-24   w-40"> Nombre del Adoptante: {mascota.nombre_usuario}</p>
                       

                        <img  src={`http://localhost:4001/img/${mascota.foto}`} className="rounded-full h-[73%] ml-11" />
                        <p  className="relative left-24 top-[2%] w-40 "> Correo del Adoptante: {mascota.correo}</p>
                      </div>
                      <div>
                      <p className="relative top-[100%] right-[98%]  ">Edad: {mascota.edad} años</p>
                      </div>
                      <div className="grid grid-cols-2 relative left-[98%] mt-6 w-[166%] ">
                      <button  className="bg-white   rounded-xl mr-2 "onClick={()=>adopt( mascota.id_mascota)}>Adoptar Macota</button>
                      <button    className="bg-white rounded-xl"  onClick={() => borrar_adopcion_p(mascota.id_adopcion,mascota.id_mascota)}>Borrar</button>

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
