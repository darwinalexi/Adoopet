import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPlus, faClose, faUser, faPaw, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../utils/axiosClent";
import { useRef } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [selectPet, setSelectedPet] = useState(null); 
  const [mpendientes, setmascotas]= useState([])
  const [raza,setraza]=useState([])
  const [categoria, setcategoria]= useState([]);
  const [genero, setgenero]= useState([]);
  const [createpet, setcreate]= useState(false);
  const[crear, setcrear]= useState(null)
  const[vacuna, setvacuna]= useState([]);
  const [adoptar, setadoptar]= useState([]);

  const nombre_mas = useRef(null);
  const razaRef = useRef(null);
  const categoria_idRef = useRef(null);
  const fotoRef = useRef(null);
  const genero_idRef = useRef(null);
  const descripcionRef = useRef(null);
  const estadoRef = useRef(null);
  const id_vacunaRef = useRef(null);
  const edad = useRef(null);


  const openModal = (pet) => {
    setSelectedPet(pet); 
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


  const close_session = async () => {
    localStorage.clear();
    navigate('/', { replace: true });
  };

 

  const listar_pendientes= async()=>{
    try {
      const listar= await axiosClient.get("/listar_pet_pendiente")
      setmascotas(listar.data)
      console.log(listar.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
   listar_pendientes();
   listar_user();
   listar_raza();
   listar_categoria();
   listar_gender()
   listar_vacunas()
  },[])

  const listar_user= async()=>{
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const nombreCompleto = usuario ? usuario.nombre : '';
    console.log(nombreCompleto)
  }

  const listar_raza=async()=>{
    try {
      const listar= await axiosClient.get("/listar_races")
      setraza(listar.data)
      
    } catch (error) {
      console.log(error)
    }
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


 
  const adopt = async(id)=>{
   try {
    
    const adoptar= await axiosClient.put(`/adoptar/${id}`)
    setadoptar(adoptar.data)
    console.log(adoptar.data)
    window.location.reload();
   } catch (error) {
    console.log("paila",error.response)
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

  const listar_vacunas=async()=>{
    try {
      const vacuna= await axiosClient.get("/listar_vacunas")
      setvacuna(vacuna.data)
      console.log("vacuna",vacuna.data)
    } catch (error) {
      console.log(error)
    }
  }



  const crear_mascota = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append('nombre_mas', nombre_mas.current.value);
      formData.append('raza', razaRef.current.value);
      formData.append('categoria_id', categoria_idRef.current.value);
      formData.append('foto', fotoRef.current.files[0]);
      formData.append('genero_id', genero_idRef.current.value);
      formData.append('descripcion', descripcionRef.current.value);
      formData.append('estado', estadoRef.current.value);
      formData.append('id_vacuna', id_vacunaRef.current.value);
      formData.append('edad', edad.current.value);
  
      const register = await axiosClient.post("/crear_pets", formData);
      console.log("respuesta", register.data.mensaje);
    } catch (error) {
      console.log("error", error.response.data.mensaje);
    }
  };
 
    

  return (
    <>
      <header className=" border-[2px] absolute top-0 w-full left-0 h-20 border-b-orange-600 h-16 ">
     <div className="w-[30%] grid grid-cols-3 absolute right-0 ">
        <div >
          <p>Adopciones pendientes</p>
              <button onClick={openModal}><FontAwesomeIcon icon={faBell}/></button>
            </div>

          <div className="mt-[7%]">
            <p>Crear Macota</p>
          <p onClick={opencreate}><FontAwesomeIcon icon={faPlus}/></p>
          </div>
        
          <div className=" grid grid-cols-2">
                        <div>
                        <h1>usuario</h1>
                        <FontAwesomeIcon icon={faUser}/>
                        </div>

                      <div onClick={close_session} className="mt-[7%]" >
                        <h1>Cerrar Sesion</h1>
                        <FontAwesomeIcon icon={faSignOutAlt} />;
                      </div>
            </div>

     </div>

        {modal &&(
         <>
          <div className="overflow-y-scroll border-orange-600 border-y-2 border-x-2 w-[29%]  relative left-[71%] top-16 grid grid-cols-1 gap-7 bg-orange-200  h-80 ">
          <button onClick={closeModal}><FontAwesomeIcon icon={faClose}/></button>
            <h3>Adopciones Pendientes</h3>
            <div className="h-23">
              {mpendientes .map((mascota)=>(
               <>
               <div className="grid grid-cols-2 h-auto pl-16 w-[100%] hover: border-y-2 hover:border-orange-600 " >
                  <div className="w-[50%] " key={mascota.id} value={mascota.id}>
                      <img src={`http://localhost:4001/img/${mascota.foto}`}  className="rounded-full w-full ml-3 h-full"/>
                      </div>
                      <div className="grid grid-cols-1  w-[50%] flex justify-start">
                      <p > Nombre: {mascota.nombre_mas}</p>
                      <p >Estado:{mascota.estado}</p>
                      <button onClick={()=>adopt(mascota.id)}> <FontAwesomeIcon icon={faPaw}/> </button>
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
           
             <div className="bg-[] w-[35%] absolute left-[33%] top-16 overflow-y-scroll h-80 bg-orange-400">
             <button onClick={close_modal}><FontAwesomeIcon icon={faClose}/></button>
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
              <label>Seleccione un  estado</label>
                      <br />
                      <select name="estado" required ref={estadoRef}  className="w-[100%] h-11  text-center rounded-lg focus-within:">
                        <option hidden>Seleccione...</option>
                        <option value="Adoptado">Adoptado</option>
                        <option value="Por Adoptar">Por Adoptar</option>
                        <option value="Pendiente">Pendiente</option>
                      </select>
              </div>


              <div className="w-[50%] relative left-[24%]">
              <label>seleccione una vacuna</label>
                      <br />
                      <select name="id_vacuna" required ref={id_vacunaRef}  className="w-[100%] h-11  text-center rounded-lg focus-within:"> 
                        <option hidden>seleccione...</option>
                        {vacuna .map((vacunas)=>(
                          <option key={vacunas.id}>{vacunas.nombre}</option>
                        ))}
                      </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
              <label>Ingrese la Edad</label>
                      <br />
                      <input type="number" name="edad" placeholder="Ingrese la edad" required ref={edad}  className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                      <br />
                </div>      
                      
                    
                    <div className="w-[50%] relative left-[17%] m-12 h-10">
                    <input type="submit" name="" className="w-[100%] border-2  border-x-orange-600  border-y-orange-600 hover:bg-orange-600 h-full rounded-xl" />
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
