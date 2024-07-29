import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "./utils/axiosClent";
import Swal from"sweetalert2"

const Petsnadop = () => {
  const [mascotasp, setmascotasp] = useState([]);
  const [crear, setcrear] = useState(null);
  const [createpet, setcreate] = useState(false);
  const [raza, setraza] = useState([]);
  const [categoria, setcategoria] = useState([]);
  const [genero, setgenero] = useState([]);
  const [idmascota, setidmascota] = useState([]);
  const [currentPetId, setCurrentPetId] = useState(null);
  const [actualizar, setactualizar] = useState(false);
  const [update, setupdate]= useState([])
  const [user, setuser]= useState([]);

  const openmodal = (pet) => {
    setcrear(pet);
    setidmascota(pet.id);
    setcreate(true);
  };

  const openupdate = (mascota) => {
    setCurrentPetId(mascota.id);
    setactualizar(true);
  };

  const listar_raza = async () => {
    try {
      const listar = await axiosClient.get("/listar_races");
      setraza(listar.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listar_categoria = async () => {
    try {
      const categorias = await axiosClient.get("/listar_categories");
      setcategoria(categorias.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listar_gender = async () => {
    try {
      const generos = await axiosClient.get("/listar_gender");
      setgenero(generos.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listar_gender();
    listar_raza();
    listar_categoria();
    listar_no_adop();
    listar_user();
  }, []);

  const nombre_masRef = useRef(null);
  const razaRef = useRef(null);
  const categoria_idRef = useRef(null);
  const fotoRef = useRef(null);
  const genero_idRef = useRef(null);
  const descripcionRef = useRef(null);
  const id_vacunaRef = useRef(null);
  const edad = useRef(null);
  const estadoRef = useRef(null);
  const usuarioref= useRef(null);
  const historial_medicor= useRef(null);

  const close_modal = () => {
    setcreate(false);
  };

  const listar_no_adop = async () => {
    try {
      const listar = await axiosClient.get("/listar_no_adoptados");
      setmascotasp(listar.data);
      console.log("mascotap",listar.data)
    } catch (error) {
      console.log(error);
    }
  };

  const actualizar_pet = async (e) => {

    if (!currentPetId) return;

    try {
      e.preventDefault()
      const formData = new FormData();
      formData.append('nombre_mas', nombre_masRef.current.value);
      formData.append('raza', razaRef.current.value);
      formData.append('categoria_id', categoria_idRef.current.value);
      formData.append('foto', fotoRef.current.files[0]);
      formData.append('genero_id', genero_idRef.current.value);
      formData.append('descripcion', descripcionRef.current.value);
      formData.append('id_vacuna', id_vacunaRef.current.value);
      formData.append('edad', edad.current.value);
      formData.append('estado', estadoRef.current.value);
      formData.append('usuario',usuarioref.current.value);
      formData.append('historial_medico',historial_medicor.current.value);

      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      console.log("Datos del FormData:", formDataObject);
      const respuesta = await axiosClient.put(`/actualizar_pets/${currentPetId}`, formData);
      setmascotasp(prevMas => prevMas.map(pet => pet.id === currentPetId ? { ...pet, ...respuesta.data } : pet));
      if (respuesta.status===200) {
        setupdate(respuesta.data.mensaje);
        console.log(respuesta.data.mensaje)
        Swal.fire({
          icon: "success",
          title: "",
          text:respuesta.data.mensaje,
          showConfirmButton: true,
          timer: 1500
        })
        window.location.reload()
      }
      
    } catch (e) {
      console.log("error para actualizar", e);
    }
  };

  const listar_user=async()=>{
    const listar= await axiosClient.get("listar")
    setuser(listar.data)
    console.log("usurios",listar.data)
  }

  const borrar_mascota = async (id, e) => {
    try {
      e.preventDefault();
      const borrar = await axiosClient.delete(`/eliminar_pets/${id}`);
      setmascotasp(prevMas => prevMas.filter(pet => pet.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

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
      <Header />
      <Sidebar />                                             {/*screen-samall     screnen-large*/}
      <div className="lg:ml-32 w-[80%] absolute left-[8%] grid grid-cols-2 gap-2 mt-10 sm:grid-cols-1 lg:grid-cols-3">
        {mascotasp.map((mascota) => (
          <div key={mascota.id} className="w-[100%]  lg:w-[100%] lg:border-spacing-20 border-[5px] border-t border-t-[#1999a6] rounded-xl border-b border-b-[#1999a6] border-l border-l border-l-[#1999a6] border-r border-r-[#1999a6]  mt-14 h-[75%] ">
            <img src={`http://localhost:4001/img/${mascota.foto}`} className="w-full h-[50%] rounded-xl" />
            <p>Nombre: {mascota.nombre_mas}</p>
            <p>Edad: {mascota.edad} años</p>
            <p>Descripcion: {mascota.descripcion}</p>
            <p>Estado: {mascota.estado}</p>
            


            {usuario=== "Administrador" && (
            <>
              <div  className="grid grid-cols-2 gap-3 w-[34%] relative left-[37%] top-4">
                <button onClick={(e) => borrar_mascota(mascota.id, e)}>
                  <FontAwesomeIcon icon={faTrashAlt}   className="size-8" color="red"/>
                </button>
                <button onClick={() => openupdate(mascota)}>
                  <FontAwesomeIcon icon={faEdit} className="size-8" color="#1999a6"/>
                </button>
            </div>
            </>
          )}
           
          </div>
        ))}

        {actualizar && (
          <div className="bw-[35%] absolute left-[33%] top-16 overflow-y-scroll h-80 bg-orange-400">
            <button onClick={close_modal}><FontAwesomeIcon icon={faClose} /></button>
            <h2>Actualizar Mascota</h2>
            <br />
            <form onSubmit={actualizar_pet}>
              <div className="w-[50%] relative left-[24%]">
                <label>Ingrese el nombre de la mascota</label>
                <br />
                <input type="text" name="nombre_mas" placeholder="Nombre" required ref={nombre_masRef} className="w-[100%] h-11 text-center rounded-lg" />
              </div>
              <div className="w-[50%] relative left-[24%]">
                <br />
                <label>Seleccione la raza</label>
                <br />
                <select name="raza" required ref={razaRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione..</option>
                  {raza.map((r) => (
                    <option key={r.id} value={r.id}>{r.nombre_r}</option>
                  ))}
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <br />
                <label>Seleccione la categoría</label>
                <br />
                <select name="categoria_id" required ref={categoria_idRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione..</option>
                  {categoria.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <br />
                <label>Ingrese una foto de la mascota</label>
                <br />
                <input type="file" name="foto" required ref={fotoRef} className="w-[100%] h-11 text-center rounded-lg" />
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Seleccione el género de la mascota</label>
                <br />
                <select name="genero_id" required ref={genero_idRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione..</option>
                  {genero.map((gen) => (
                    <option key={gen.id} value={gen.id}>{gen.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Añada una descripción breve de la mascota</label>
                <br />
                <input type="text" name="descripcion" placeholder="Describa la mascota" required ref={descripcionRef} className="w-[100%] h-11 text-center rounded-lg" />
                <br />
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Seleccione un estado</label>
                <br />
                <select name="estado" required ref={estadoRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione...</option>
                  <option value="Adoptado">Adoptado</option>
                  <option value="Por Adoptar">Por Adoptar</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Seleccione una vacuna</label>
                <br />
                <select name="id_vacuna" required ref={id_vacunaRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione...</option>
                  <option value="Vacunado">Vacunado</option>
                  <option value="No Vacunado">No Vacunado</option>
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Ingrese la Edad</label>
                <br />
                <input type="number" name="edad" placeholder="Ingrese la edad" required ref={edad} className="w-[100%] h-11 text-center rounded-lg" />
                <br />
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
                 <label>Ingrese  el Historia medico </label>
                      <br />
                      <input type="text" name="historial_medico" placeholder="Ingrese la edad" required ref={historial_medicor}  className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                      <br />
                </div> 

              <div className="w-[50%] relative left-[17%] m-12 h-10">
                <input type="submit" value="Actualizar" className="w-[100%] border-2 border-x-orange-600 border-y-orange-600 hover:bg-orange-600 h-full rounded-xl" />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Petsnadop;
