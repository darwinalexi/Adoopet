import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPlus, faClose, faUser, faPaw, faSignOutAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../utils/axiosClent";
import { useRef } from "react";
import Swal from"sweetalert2"

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

  const nombre_mas = useRef(null);
  const razaRef = useRef(null);
  const categoria_idRef = useRef(null);
  const fotoRef = useRef(null);
  const genero_idRef = useRef(null);
  const descripcionRef = useRef(null);
  const id_vacunaRef = useRef(null);
  const edad = useRef(null);
  const usuarioref= useRef(null);
  const historial_medicor= useRef(null);


  const openModal = (mpendientes) => {
    setSelectedPet(mpendientes);
    setboraradoppen(mpendientes.id) 
    
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

const opencreate = (pet)=>{
  setcrear(pet)
  setcreate(true)
 
}

const close_modal=()=>{
setcreate(false)
}

const navigate = useNavigate();
  const close_session = async () => {
    localStorage.clear();
    navigate('/', { replace: true });
    window.location.reload();
  };

  useEffect(()=>{
    listar_raza();
    listar_categoria();
    listar_gender();
    listar_pendientes();
    listar_user();
   },[])
 

  const listar_pendientes= async()=>{
    try {
      const listar= await axiosClient.get("/listar_adopciones")
        setmascotas(listar.data)
      
    } catch (error) {
      console.log(error)
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


 
  const adopt = async(id_adopcion, id_mascota)=>{

    try {
    const adoptar= await axiosClient.put(`/adoptar/${id_adopcion}/${id_mascota}`)
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

 



  const crear_mascota = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('nombre_mas', nombre_mas.current.value);
      formData.append('raza', razaRef.current.value);
      formData.append('categoria_id', categoria_idRef.current.value);
      formData.append('foto', fotoRef.current.files[0]);
      formData.append('genero_id', genero_idRef.current.value);
      formData.append('descripcion', descripcionRef.current.value);
      formData.append('id_vacuna', id_vacunaRef.current.value);
      formData.append('edad', edad.current.value);
      formData.append('usuario',usuarioref.current.value);
      formData.append('historial_medico',historial_medicor.current.value);
  console.log("datos",formData)
      const register = await axiosClient.post("/crear_pets", formData);
      if (register.status===200) {
        Swal.fire({
          icon: "success",
          title: "se creo",
          text:register.data.mensaje,
          showConfirmButton: true,
          timer: 3500
        })
        window.location.reload();
      }
      nombre_mas.current.value = '';
      razaRef.current.value = '';
      categoria_idRef.current.value = '';
      fotoRef.current.value = ''; 
      genero_idRef.current.value = '';
      descripcionRef.current.value = '';
      id_vacunaRef.current.value = '';
      edad.current.value = '';
      usuarioref.current.value = '';
      historial_medicor.current.value = '';
    
    } catch (error) {
      console.log("error", error.response);
    }
  };
  const [usuario, setTipo] = useState([]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
    if (usuarios.length > 0) {
      const usuario = usuarios[0];
      setTipo(usuario.tipo);
    }
  }, []);

  const borrar_adopcion_p= async(id_adopcion, id_mascota)=>{
  try {
 
    const  borrar = await axiosClient.delete(`/eliminar_adopcion/${id_adopcion}/${id_mascota}`)
    Swal.fire({
      icon: "success",
      title: "",
      text:borrar.data.mensaje,
      showConfirmButton: true,
      timer: 1500
    })
window.location.reload();
  } catch (e) {
    console.log(e)
  }
  }

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
                      <div className="w-[90%] mt-6">
                        <p>Crear Mascota</p>
                      <p onClick={opencreate}><FontAwesomeIcon icon={faPlus} color="#1999a6"/></p>
                      </div>
                        <div className=" w-[90%]  mt-6">
                        <h1>{nombre}</h1>
                        <FontAwesomeIcon icon={faUser} color="#1999a6"/>
                        </div>
                      <div onClick={close_session} className=" w-[90%]  mt-6">
                        <h1>Cerrar Sesion</h1>
                        <FontAwesomeIcon icon={faSignOutAlt}  color="#1999a6"/>;
                      </div>
      </div>
          </>
          )}
        
        {usuario==="Usuario" &&(
          <>
           <div>
                   

                      <div onClick={close_session} className="w-4">
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
               <div className="h-auto mt-7  w-[100%]  hover:border-b border-slate-200 hover:border-t border-slate-200 " >
                      <div className="grid grid-cols-2  w-[50%] w-full">
                      <div className="grid grid-cols-2 w-[100%] w-full">
                        <p className="w-36 mt-4">Nombre Mascota: {mascota.nombre_mascota}</p>
                        <p  className="relative left-24  top-9 w-40"> Nombre del Adoptante: {mascota.nombre_usuario}</p>
                       

                        <img  src={`http://localhost:4001/img/${mascota.foto}`} className="rounded-full h-[73%] ml-11" />
                        <p  className="relative left-24 top-9 w-40"> Correo del Adoptante: {mascota.correo}</p>
                      </div>
                      <div>
                      <p className="relative top-[62%] right-[35%]">Edad de la mascota : {mascota.edad}</p>
                      <p className="relative top-[65%] right-[35%]">Estado: {mascota.estado_adopcion}</p>
                      </div>
                      <div className="grid grid-cols-2 relative left-[55%] mb-6">
                      <button  className="hover:bg-[#1999a6] hover: rounded-xl "onClick={()=>adopt(mascota.id_adopcion, mascota.id_mascota)}>Adoptar Macota</button>
                      <button    className="hover:bg-[#1999a6] hover:rounded-xl"  onClick={() => borrar_adopcion_p(mascota.id_adopcion, mascota.id_mascota)}>Borrar</button>

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

        {createpet &&(
            <>
             <div className=" w-[35%] absolute left-[33%] top-16 overflow-y-scroll h-80 bg-[#1999a6] rounded-lg">
             <button className="relative left-[44%] top-6" onClick={close_modal}><FontAwesomeIcon icon={faClose} className="size-6"/></button>
             <h2>Crea Una Macota</h2>
             <br />
             <form onSubmit={crear_mascota}>
              <div  className="w-[50%] relative left-[24%]">
              <label>Ingrese el nombre de la mascota</label>
                      <br />
                      <input type="text" name="nombre_mas" placeholder="Nombre"  required ref={nombre_mas}  className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
              </div>
              <div className="w-[50%] relative left-[24%]">
              <br />
                      <label>seleccione la raza</label>
                      <br />
                        <select name="raza" required ref={razaRef}  className="w-[100%] h-11  text-center rounded-lg focus-within:">
                          <option hidden>seleccione..</option>
                          {raza .map((raza)=>(
                            <option key={raza.id} value={raza.id}>{raza.nombre_r}</option>
                          ))}
                        </select>
              </div>
           
                  <div className="w-[50%] relative left-[24%]">
                  <br />
                        <label>  seleccione la categoria</label>
                        <br />
                        <select name="categoria_id" required ref={categoria_idRef}  className="w-[100%] h-11  text-center rounded-lg focus-within:">
                        <option  hidden>seleccione..</option>
                        {categoria .map((categorie)=>(
                          <option key={categorie.id} value={categorie.id}>{categorie.nombre}</option>
                        ))}
                        </select>
                  </div>
                      <div  className="w-[50%] relative left-[24%]">
                      <br />
                        <label>Ingrese una foto de la mascota</label>
                        <br />
                        <input type="file" name="foto" required ref={fotoRef}  className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                      </div>

                    <div className="w-[50%] relative left-[24%]">
                    <label>Seleccione el genero de la mascota</label>
                        <br />
                        <select name="genero_id" required ref={genero_idRef}  className="w-[100%] h-11  text-center rounded-lg focus-within:">
                          <option  hidden>seleccione..</option>
                          {genero .map((generos)=>(
                            <option key={generos.id} value={generos.id}>{generos.nombre}</option>
                          ))}
                        </select>
                    </div>

                  <div  className="w-[50%] relative left-[24%]">
                    <label>Añada un descripción breve de la mascota</label>
                        <br />
                        <input type="text" name="descripcion" placeholder="Describa la mascota" required ref={descripcionRef}  className="w-[100%] h-11  text-center rounded-lg focus-within:" />
                        <br />
                  </div>


              <div className="w-[50%] relative left-[24%]">
              <label>seleccione estado de vacuna</label>
                      <br />
                      <select name="id_vacuna" required ref={id_vacunaRef}  className="w-[100%] h-11  text-center rounded-lg focus-within:"> 
                        <option hidden>seleccione...</option>
                        <option value="Vacunado">Vacunado</option>
                        <option value="No Vacunado">No Vacunado</option>
                      </select>
              </div>
              <div>
                <label>Selecciona el usuario qure registra la mascota</label>
                <br />
                <select  required ref={usuarioref}  className=" h-11  text-center rounded-lg focus-within:">
                  <>
                  <option hidden>seleccione...</option>
                  {user .map((usuario)=>(
                      <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                  ))}
                  </>
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
              <label>Ingrese la Edad</label>
                      <br />
                      <input type="number" name="edad" placeholder="Ingrese la edad" required ref={edad}  className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                      <br />
                </div>     

                 <div className="w-[50%] relative left-[24%]">
                 <label>Ingrese  el Historia medico </label>
                      <br />
                      <input type="text" name="historial_medico" placeholder="Ingrese la edad" required ref={historial_medicor}  className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                      <br />
                </div>   
                    <div className="w-[50%] relative left-[17%] m-12 h-10">
                    <input type="submit" name="" className="w-[100%] border-2 bg-slate-200 h-full rounded-xl" />
                    </div>
             </form>
             </div>
            </>
        )}
      </header>
    </>
  );
};

export default Header;
