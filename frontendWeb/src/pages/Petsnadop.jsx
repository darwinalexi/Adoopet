import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "./utils/axiosClent";
import Swal from "sweetalert2";

const Petsnadop = () => {
  const [mascotasp, setMascotasp] = useState([]);
  const [crear, setCrear] = useState(null);
  const [createPet, setCreatePet] = useState(false);
  const [raza, setRaza] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [genero, setGenero] = useState([]);
  const [currentPetId, setCurrentPetId] = useState(null);
  const [actualizar, setActualizar] = useState(false);
  const [update, setUpdate] = useState('');
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [idPet, setIdPet] = useState(null);

  const nombreMasRef = useRef(null);
  const razaRef = useRef(null);
  const categoriaIdRef = useRef(null);
  const fotoRef = useRef(null);
  const generoIdRef = useRef(null);
  const descripcionRef = useRef(null);
  const idVacunaRef = useRef(null);
  const edadRef = useRef(null);
  const estadoRef = useRef(null);
  const usuarioRef = useRef(null);
  const historialMedicoRef = useRef(null);

  const openModal = (pet) => {
    setCrear(pet);
    setCurrentPetId(pet.id);
    setCreatePet(true);
  };

  const openUpdate = (mascota) => {
    setCurrentPetId(mascota.id);
    setActualizar(true);
  };

  const openShow = (mascota) => {
    setShow(true);
    setIdPet(mascota.id);
  };

  const closeShow = () => {
    setShow(false);
  };

  const listarRaza = async () => {
    try {
      const listar = await axiosClient.get("/listar_races");
      setRaza(listar.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarCategoria = async () => {
    try {
      const categorias = await axiosClient.get("/listar_categories");
      setCategoria(categorias.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarGenero = async () => {
    try {
      const generos = await axiosClient.get("/listar_gender");
      setGenero(generos.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarMascotasNoAdoptadas = async () => {
    try {
      const listar = await axiosClient.get("/listar_no_adoptados");
      setMascotasp(listar.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarUsuarios = async () => {
    try {
      const listar = await axiosClient.get("/listar");
      setUser(listar.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarGenero();
    listarRaza();
    listarCategoria();
    listarMascotasNoAdoptadas();
    listarUsuarios();
  }, []);

  const closeModal = () => {
    setCreatePet(false);
  };

  const actualizarPet = async (e) => {
    e.preventDefault();
    if (!currentPetId) return;

    try {
      const formData = new FormData();
      formData.append('nombre_mas', nombreMasRef.current.value);
      formData.append('raza', razaRef.current.value);
      formData.append('categoria_id', categoriaIdRef.current.value);
      formData.append('foto', fotoRef.current.files[0]);
      formData.append('genero_id', generoIdRef.current.value);
      formData.append('descripcion', descripcionRef.current.value);
      formData.append('id_vacuna', idVacunaRef.current.value);
      formData.append('edad', edadRef.current.value);
      formData.append('estado', estadoRef.current.value);
      formData.append('usuario', usuarioRef.current.value);
      formData.append('historial_medico', historialMedicoRef.current.value);

      const respuesta = await axiosClient.put(`/actualizar_pets/${currentPetId}`, formData);
      setMascotasp(prevMas => prevMas.map(pet => pet.id === currentPetId ? { ...pet, ...respuesta.data } : pet));
      if (respuesta.status === 200) {
        setUpdate(respuesta.data.mensaje);
        Swal.fire({
          icon: "success",
          title: "",
          text: respuesta.data.mensaje,
          showConfirmButton: true,
          timer: 1500
        });
        window.location.reload();
      }
    } catch (error) {
      console.log("error para actualizar", error);
    }
  };

  const borrarMascota = async (id, e) => {
    e.preventDefault();
    try {
      const borrar = await axiosClient.delete(`/eliminar_pets/${id}`);
      setMascotasp(prevMas => prevMas.filter(pet => pet.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const [usuarioTipo, setUsuarioTipo] = useState('');

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
    const tipo = usuarios ? usuarios.tipo : '';
    setUsuarioTipo(tipo)
  }, [])
  
  // Encuentra la mascota seleccionada
  const selectedPet = mascotasp.find((mascota) => mascota.id === idPet);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="lg:ml-32 w-[50%] absolute left-[23%] grid grid-cols-2 gap-8 mt-10 sm:grid-cols-1 lg:grid-cols-3">
        {mascotasp.map((mascota) => (
          <div key={mascota.id} className="w-[100%] lg:w-[100%] border-[5px]  border-t border-t-[#1999a6] rounded-xl border-b border-b-[#1999a6] border-l border-l border-l-[#1999a6] border-r border-r-[#1999a6] mt-14 h-[75%]">
            <img src={`http://localhost:4001/img/${mascota.foto}`} className="w-[100%] h-[50%] rounded-xl" alt={`Imagen de ${mascota.nombre_mas}`} />
            <p>Nombre: {mascota.nombre_mas}</p>
            <p>Edad: {mascota.edad} años</p>
            <p>Descripcion: {mascota.descripcion}</p>
            {usuarioTipo === "Administrador" && (
              <div className="grid grid-cols-3 gap-3 w-[34%] relative left-[37%] top-4">
                <button onClick={(e) => borrarMascota(mascota.id, e)}>
                  <FontAwesomeIcon icon={faTrashAlt} className="size-8" color="red" />
                </button>
                <button onClick={() => openUpdate(mascota)}>
                  <FontAwesomeIcon icon={faEdit} className="size-8" color="#1999a6" />
                </button>
                <button onClick={() => openShow(mascota)}>
                  <FontAwesomeIcon icon={faSearch} className="size-8" color="#1999a6" />
                </button>
              </div>
            )}
          </div>
        ))}

        {actualizar && (
          <div className="w-[65%] absolute left-[2%] top-16 overflow-y-scroll h-80 bg-[#1999a6] rounded-lg">
            <button onClick={closeModal} className="relative left-[44%] top-6">
              <FontAwesomeIcon icon={faClose}  className="size-6"/>
            </button>
            <h2>Actualizar Mascota</h2>
            <form onSubmit={actualizarPet}>
              <div className="w-[50%] relative left-[24%]">
                <label>Ingrese el nombre de la mascota</label>
                <input type="text" placeholder="Nombre" required ref={nombreMasRef} className="w-[100%] h-11 text-center rounded-lg" />
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Seleccione la raza</label>
                <select required ref={razaRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione..</option>
                  {raza.map((r) => (
                    <option key={r.id} value={r.id}>{r.nombre_r}</option>
                  ))}
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Seleccione la categoría</label>
                <select required ref={categoriaIdRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione..</option>
                  {categoria.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Ingrese una foto de la mascota</label>
                <input type="file" required ref={fotoRef} className="w-[100%] h-11 text-center rounded-lg" />
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Seleccione el género de la mascota</label>
                <select required ref={generoIdRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione..</option>
                  {genero.map((gen) => (
                    <option key={gen.id} value={gen.id}>{gen.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Añada una descripción breve de la mascota</label>
                <input type="text" placeholder="Describa la mascota" required ref={descripcionRef} className="w-[100%] h-11 text-center rounded-lg" />
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Seleccione un estado</label>
                <select required ref={estadoRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione...</option>
                  <option value="Adoptado">Adoptado</option>
                  <option value="Por Adoptar">Por Adoptar</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Seleccione una vacuna</label>
                <select required ref={idVacunaRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione...</option>
                  <option value="Vacunado">Vacunado</option>
                  <option value="No Vacunado">No Vacunado</option>
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Ingrese la Edad</label>
                <input type="number" placeholder="Ingrese la edad" required ref={edadRef} className="w-[100%] h-11 text-center rounded-lg" />
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Selecciona el usuario que registra la mascota</label>
                <select required ref={usuarioRef} className="w-[100%] h-11 text-center rounded-lg">
                  <option hidden>Seleccione...</option>
                  {user.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="w-[50%] relative left-[24%]">
                <label>Ingrese el Historial médico</label>
                <input type="text" placeholder="Ingrese el historial médico" required ref={historialMedicoRef} className="w-[100%] h-11 text-center rounded-lg" />
              </div>
              <div className="w-[50%] relative left-[17%] m-12 h-10">
                <input type="submit" value="Actualizar" className="w-[100%] border-2 border-x-slate-200 border-y-slate-200 hover:bg-slate-200 h-full rounded-xl" />
              </div>
            </form>
          </div>
        )}

        {show && selectedPet && (
          <div className="absolute top-16 left-[50%] transform -translate-x-1/2 bg-white p-4 shadow-lg rounded-lg w-1/2">
            <button onClick={closeShow} className="absolute top-2 right-2">
              <FontAwesomeIcon icon={faClose}  size="23px"/>
            </button>
            <h1 className="text-xl font-bold">Detalles de la Mascota</h1>
            <p><strong>Nombre:</strong> {selectedPet.nombre_mas}</p>
            <p><strong>Edad:</strong> {selectedPet.edad} años</p>
            <p><strong>Raza:</strong> {raza.find(r => r.id === selectedPet.raza)?.nombre_r}</p>
            <p><strong>Categoría:</strong> {categoria.find(cat => cat.id === selectedPet.categoria_id)?.nombre}</p>
            <p><strong>Género:</strong> {genero.find(gen => gen.id === selectedPet.genero_id)?.nombre}</p>
            <p><strong>Descripción:</strong> {selectedPet.descripcion}</p>
            <p><strong>Estado:</strong> {selectedPet.estado}</p>
            <p><strong>Vacuna:</strong> {selectedPet.id_vacuna}</p>
            <p><strong>Usuario que Registro  la mascota:</strong> {user.find(u => u.id === selectedPet.usuario)?.nombre}</p>
            <p><strong>Historial Médico:</strong> {selectedPet.historial_medico}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Petsnadop;
