import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import axiosClient from "../../utils/axiosClent";


function  Edit_Mascot({data, onclose}) {
    
    const [update, setUpdate] = useState('');
    const [user, setUser] = useState([]);
    
    const [categoria, setCategoria] = useState([]);
    const [genero, setGenero] = useState([]);
    const [Raza, setRaza]= useState([])
    const [municipiois,setmunicipios]= useState([])
    const [depatr ,setdepart]= useState([]);
    const [vacunas, setvacunas]= useState([])
    const [mascotasp, setMascotasp]= useState([])
        //se crea una const para guardar varias img
    const [fotos, setfotos]= useState([])


    const listar_vacunas= async()=> {
        const listar= await axiosClient.get("/vacunas")
        setvacunas(listar.data)
        console.log("vacunas",listar.data)
       }

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
          const mascotasp = await axiosClient.get("/listar_categories");
          setCategoria(mascotasp.data);
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
    
     
    
      const listarUsuarios = async () => {
        try {
          const listar = await axiosClient.get("/listar");
          setUser(listar.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      const saveimg = (event) => {
        let files = event.target.files;
        if (files.length > 6) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Solo se permite El cargue de hasta 6 img",
            showConfirmButton: true
        });
          event.target.value = null;
          return;
        }
        setfotos([...fotos, ...Array.from(files)]);
      };
     

      const listarmuni= async()=> {
        const response= await axiosClient.get("/listar_municipios")
        setmunicipios(response.data)
      }

      const listardepar= async()=> {
        const response= await axiosClient.get("/departamento")
        setdepart(response.data)
      }

        
      useEffect(() => {
        listardepar();
        listarGenero();
        listarRaza();
        listarCategoria();
        listarUsuarios();
        listarmuni();
        listar_vacunas();
      }, []);
    

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
      const municipioRef = useRef(null);
      const departamentoRef = useRef(null);
      const vacunaRef = useRef(null);
    
      
      console.log('data:', data);
      console.log('Raza:', Raza);
      console.log('Categoria:', categoria);
      console.log('Genero:', genero);
      console.log('User:', user);
    const actualizarPet = async (e) => {
        e.preventDefault();
        
    
        try {
          const formData = new FormData();
          formData.append('nombre_mas', nombreMasRef.current.value);
          formData.append('raza', razaRef.current.value);
          formData.append('categoria_id', categoriaIdRef.current.value);
          fotos.forEach((file) => {
            formData.append('foto', file); 
          });
          formData.append('genero_id', generoIdRef.current.value);
          formData.append('descripcion', descripcionRef.current.value);
          formData.append('id_vacuna', idVacunaRef.current.value);
          formData.append('edad', edadRef.current.value);
          formData.append('estado', estadoRef.current.value);
          formData.append('usuario', usuarioRef.current.value);
          formData.append('historial_medico', historialMedicoRef.current.value);
          formData.append('municipio', municipioRef.current.value);
          formData.append('departamento', departamentoRef.current.value);
          formData.append('vacuna', vacunaRef.current.value);
    
          const respuesta = await axiosClient.put(`/actualizar_pets/${data.id}`, formData);
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
    
    
    return(
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full ">
      <div className="bg-white w-[36%]  grid grid-rows-1  gap-0 h-[75%] relative top-[18%] left-[35%] rounded-2xl flex justify-center overflow-scroll">
                    <button onClick={onclose} className="absolute left-[94%] top-6">
                    <FontAwesomeIcon icon={faClose}  className="size-6"/>
                    </button>
                    <form onSubmit={actualizarPet} className="h-67 w-[100%] absolute">
                    <h2 className="text-2xl">Actualizar Mascota</h2>
                    <div className="w-[50%] relative left-[24%] ">
                        <label>Ingrese el nombre de la mascota</label>
                        <input type="text" placeholder="Nombre"  defaultValue={data.nombre_mascota} required ref={nombreMasRef}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]" />
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>Seleccione la raza</label>
                        <select required ref={razaRef} value={data.raza_id}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]" defaultValue={data.nombre_raza} >
                        <option hidden>Seleccione..</option>
                        {Raza.map((r) => (
                            <option key={r.id} value={r.id}>{r.nombre_r}</option>
                        ))}
                        </select>
                    </div>
                    <div  className="w-[50%] relative left-[24%]">
                        <label>Seleccione la categoría</label>
                        <select required ref={categoriaIdRef} value={data.categoria_id}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
                        <option hidden>Seleccione..</option>
                        {categoria.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                        </select>
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>Ingrese una foto de la mascota</label>
                        <input 
                        type="file" 
                        onChange={saveimg}  
                        required ref={fotoRef} 
                        className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"  multiple/>
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>Seleccione el género de la mascota</label>
                        <select required ref={generoIdRef} value={data.genero_id}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
                        <option hidden>Seleccione..</option>
                        {genero.map((gen) => (
                            <option key={gen.id} value={gen.id}>{gen.nombre}</option>
                        ))}
                        </select>
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>Añada una descripción breve de la mascota</label>
                        <input type="text" placeholder="Describa la mascota" required ref={descripcionRef} defaultValue={data.descripcion}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]" />
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>Seleccione un estado</label>
                        <select required ref={estadoRef}  value={data.nombre_estado}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
                        <option hidden>Seleccione...</option>
                        <option value="Adoptado">Adoptado</option>
                        <option value="Por adoptar">Por Adoptar</option>
                        <option value="En Proceso">Pendiente</option>
                        </select>
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>Seleccione una vacuna</label>
                        <select required ref={idVacunaRef}  value={data.estado_vacuna}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
                        <option hidden>Seleccione...</option>
                        <option value="Vacunado">Vacunado</option>
                        <option value="No Vacunado">No Vacunado</option>
                        </select>
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>Ingrese la Edad</label>
                        <input type="number"  defaultValue={data.edad} placeholder="Ingrese la edad" required ref={edadRef} className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"/>
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>Selecciona el usuario que registra la mascota</label>
                        <select required ref={usuarioRef} value={data.id_usuario}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
                        <option hidden>Seleccione...</option>
                        {user.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                        ))}
                        </select>
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>Ingrese el Historial médico</label>
                        <input type="text"  defaultValue={data.historial_medico} placeholder="Ingrese el historial médico" required ref={historialMedicoRef} className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]" />
                    </div>
                    <div className="w-[50%] relative left-[24%]">
                        <label>seleccione el  Municipio</label>
                        <select   value={data.id_municipio}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]" required ref={municipioRef}>
                     {municipiois .map((datos)=>(
                         <option key={datos.id} value={datos.id}>{datos.nombre}</option>
                     ))}
                        </select>
                    </div>

                    <div className="w-[50%] relative left-[24%]">
                        <label>seleccione el  Departamento</label>
                        <select   value={data.id_departamento}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]" required ref={departamentoRef}>
                     {depatr .map((datos)=>(
                         <option key={datos.id} value={datos.id}>{datos.nombre}</option>
                     ))}
                        </select>
                    </div>
                    <label> Seleccione una Vacuna En caso de estar vacunado sino debe seleccionar ninguna</label>
                    {vacunas.map((vacuna) => (
                            <div key={vacuna.id} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`vacuna-${vacuna.id}`}
                                    name="vacuna"
                                    value={vacuna.id}
                                    required
                                    ref={vacunaRef}
                                    className="mr-2"
                                />
                                <label htmlFor={`vacuna-${vacuna.id}`}>{vacuna.nombre}</label>
                            </div>
                    ))}
                    <div className="w-[50%] relative left-[17%] m-12 h-10">
                        <input type="submit" value="Actualizar" className="w-[100%] border-2 border-x-slate-200 border-y-slate-200 hover:bg-slate-200 h-full rounded-xl" />
                    </div>
                    </form>
                </div>
        </div>
       
    )
}

export default Edit_Mascot;