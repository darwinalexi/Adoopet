import axiosClient from "../../utils/axiosClent"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from"react-datepicker"
import { useRef } from "react";

function Creae_Pets({onclose}){
    const [user, setuser]= useState([]);
    const [categoria, setcategoria]= useState([]);
    const [genero, setgenero]= useState([]);
    const [raza, setraza]=useState([])
    const [municipio, setmnuni]= useState([])
    const [depart , setdepart]= useState([])
    const [vacunas, setvacunas]= useState([])
    //se crea una const para guardar varias img
    const [fotos, setfotos]= useState([])
    const [fecha, setfecha]= useState(new Date());


    const onChange=(fecha)=>{
      setfecha(fecha)
    }
    const listar_raza=async()=>{
        try {
          const listar= await axiosClient.get("/listar_races")
          setraza(listar.data)
          
        } catch (error) {
          console.log(error)
        }
      }

      const listar_user=async()=>{
       try {
        const listar= await axiosClient.get("/listar")
        setuser(listar.data)

       } catch (error) {
        console.log("usurios",error)
       }
      }
    

      const listar_categoria=async()=>{
        try {
          
          const categorias= await axiosClient.get("/listar_categories")
          setcategoria(categorias.data)
         
        } catch (error) {
          console.log(error)
        }
      }

      const listar_gender=async()=>{
        try {
          
          const generos= await axiosClient.get("/listar_gender")
          setgenero(generos.data)
       
        } catch (error) {
          console.log(error)
        }
      }

      const listar_municipio= async()=>{
        const municipio= await axiosClient.get("/listar_municipios")
        setmnuni(municipio.data)
      
      }
      const listar_departamento= async()=>{
        const municipio= await axiosClient.get("/departamento")
        setdepart(municipio.data)
     
      }

    const nombre_mas = useRef(null);
    const razaRef = useRef(null);
    const categoria_idRef = useRef(null);
    const fotoRef = useRef(null);
    const genero_idRef = useRef(null);
    const descripcionRef = useRef(null);
    const id_vacunaRef = useRef(null);
   
    const usuarioref= useRef(null);
    const historial_medicor= useRef(null);
    const municipioref= useRef(null)
    const departamentoref= useRef(null)
    const idVacunaRef= useRef(null)


    const saveimg = (event) => {
      let files = event.target.files;
      if (files.length > 6) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Solo se permite El cague de Hasta 6 img.",
          showConfirmButton: true
      });
        event.target.value = null;
        return;
      }
      setfotos([...fotos, ...Array.from(files)]);
    };
    const crear_mascota = async (e) => {
      e.preventDefault();

      if (
        !nombre_mas.current.value ||
        !razaRef.current.value ||
        !categoria_idRef.current.value ||
        !fotoRef.current.files.length ||
        !genero_idRef.current.value ||
        !descripcionRef.current.value ||
        !id_vacunaRef.current.value ||
        
        !usuarioref.current.value ||
        !historial_medicor.current.value ||
        !municipioref.current.value ||
        !departamentoref.current.value ||
        !idVacunaRef.current.value
    ) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, completa todos los campos.",
            showConfirmButton: true
        });
        return;
    }
    
     
    const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
      // Validación de patrones
      if (!regex.test(nombre_mas.current.value)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "tienes campos incorrectos que solo pueden contener letras y espacios.",
            showConfirmButton: true
        });
        return;
    }

    if (!regex.test(historial_medicor.current.value )) {
      Swal.fire({
          icon: "error",
          title: "Error",
          text: "tienes campos incorrectos que solo pueden contener letras y espacios.",
          showConfirmButton: true
      });
      return;
  }
  if (!regex.test( descripcionRef.current.vacunas)) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: "tienes campos incorrectos que solo pueden contener letras y espacios.",
        showConfirmButton: true
    });
    return;
}

        try {
          const formData = new FormData();
          formData.append('nombre_mas',  nombre_mas.current.value.trim());
          formData.append('raza', razaRef.current.value.trim());
          formData.append('categoria_id', categoria_idRef.current.value.trim());
          
          fotos.forEach((file) => {
            formData.append('foto', file); 
          });
          formData.append('genero_id', genero_idRef.current.value.trim());
          formData.append('descripcion', descripcionRef.current.value.trim());
          formData.append('id_vacuna', id_vacunaRef.current.value.trim());
          formData.append('fecha', fecha.toISOString());
          formData.append('usuario',usuarioref.current.value.trim());
          formData.append('historial_medico',historial_medicor.current.value.trim());
          formData.append('municipio', municipioref.current.value.trim());
          formData.append('departamento', departamentoref.current.value.trim());
          formData.append('vacuna', idVacunaRef.current.value.trim());
  
    
          const register = await axiosClient.post("/crear_pets", formData);
          console.log(register.data.mensaje)
          
          Swal.fire({
                  icon: "success",
                  title: "Se creó con éxito",
                  text: register.data.mensaje,
                  showConfirmButton: true,
                  timer: 3500
              });
              onclose(); 
              window.location.reload();
        
  
        
  
         
        } catch (error) {
            console.log("error", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error,
                showConfirmButton: true
            });
        }
    };
    


   const listar_vacunas= async()=> {
    const listar= await axiosClient.get("/vacunas")
    setvacunas(listar.data)
    console.log("vacunas",listar.data)
   }

      useEffect(()=> {
        listar_vacunas();
        listar_categoria();
        listar_gender()
        listar_user();
        listar_raza();
        listar_municipio();
        listar_departamento();
      },[])

      return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg relative h-[89%] overflow-y-scroll">

                          <button className="relative left-[44%] top-6" onClick={onclose}><FontAwesomeIcon icon={faClose} className="size-6"/></button>
                          <h2>Crea Una Macota</h2>
                          <br />
                          <form onSubmit={crear_mascota}>
                            <div  className="w-[50%] relative left-[24%]">
                            <label>Ingrese el nombre de la mascota</label>
                                    <br />
                                    <input type="text" name="nombre_mas" placeholder="Nombre"  required ref={nombre_mas}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"/>
                            </div>
                            <div className="w-[50%] relative left-[24%]">
                            <br />
                                    <label>seleccione la raza</label>
                                    <br />
                                      <select name="raza" required ref={razaRef}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
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
                                      <select name="categoria_id" required ref={categoria_idRef}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
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
                                      <input 
                                        type="file" 
                                        name="foto" 
                                        onChange={saveimg} 
                                        required ref={fotoRef} 
                                        multiple
                                        maxFiles={6}
                                        className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                                      />
                                    </div>

                                  <div className="w-[50%] relative left-[24%]">
                                  <label>Seleccione el genero de la mascota</label>
                                      <br />
                                      <select name="genero_id" required ref={genero_idRef}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
                                        <option  hidden>seleccione..</option>
                                        {genero .map((generos)=>(
                                          <option key={generos.id} value={generos.id}>{generos.nombre}</option>
                                        ))}
                                      </select>
                                  </div>

                                <div  className="w-[50%] relative left-[24%]">
                                  <label>Añada un descripción breve de la mascota</label>
                                      <br />
                                      <input type="text" name="descripcion" placeholder="Describa la mascota" required ref={descripcionRef}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]" />
                                      <br />
                                </div>


                            <div className="w-[50%] relative left-[24%]">
                            <label>seleccione estado de vacuna</label>
                                    <br />
                                    <select name="id_vacuna" required ref={id_vacunaRef}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"> 
                                      <option hidden>seleccione...</option>
                                      <option value="Vacunado">Vacunado</option>
                                      <option value="No Vacunado">No Vacunado</option>
                                    </select>
                            </div>
                            <div>
                              <label>Selecciona el usuario qure registra la mascota</label>
                              <br />
                              <select  required ref={usuarioref}   className="w-[50%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
                                <>
                                <option hidden>seleccione...</option>
                                {user .map((usuario)=>(
                                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                                ))}
                                </>
                              </select>
                            </div>
                            <div className="w-[50%] relative left-[24%]">
                            <label>selecciona la fecha de nacimiento</label>
                                    <br />
                                    <DatePicker  
                                    //selecciona la fecha y la muesstra 
                                    selected={fecha} 
                                    onChange={(fecha)=>onChange(fecha)} 
                                    //no permite que el user selecione una fecha adelantada 
                                    maxDate={new Date()}
                                    showYearDropdown
                                    
                                    className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"/>
                                    <br />
                              </div>     

                              <div className="w-[50%] relative left-[24%]">
                              <label>Ingrese  el Historia medico </label>
                                    <br />
                                    <input type="text" name="historial_medico" placeholder="Ingrese la historia" required ref={historial_medicor}  className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"/>
                                    <br />
                              </div>   

                              <div className="w-[50%] relative left-[24%]">
                                <label > Seleccion departamento de ubicacion</label>
                                <br />
                              <select  required ref={departamentoref}   className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
                                <>
                                <option hidden>seleccione...</option>
                                {depart .map((departa)=>(
                                    <option key={departa.id} value={departa.id}>{departa.nombre}</option>
                                ))}
                           
                                </>
                              </select>
                              </div>

                              <div className="w-[50%] relative left-[24%]">
                                <label > Seleccion municipio de ubicacion</label>
                                <br />
                              <select  required ref={municipioref}   className="w-[100%] h-11  text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]">
                                <>
                                <option hidden>seleccione...</option>
                                {municipio .map((municipi)=>(
                                    <option key={municipi.id} value={municipi.id}>{municipi.nombre}</option>
                                ))}
                           
                                </>
                              </select>
                              </div>

                              <div className="w-[50%] relative left-[23%] top-6">
                              <label> Seleccione una Vacuna, En caso de estar vacunado o  Sino ve la vacuna debe seleccionar ninguna</label>
                              {vacunas.map((vacuna) => (
                            <div key={vacuna.id} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`vacuna-${vacuna.id}`}
                                    name="vacuna"
                                    value={vacuna.id}
                                    required
                                    ref={idVacunaRef}
                                    className="mr-2"
                                />
                                <label htmlFor={`vacuna-${vacuna.id}`}>{vacuna.nombre}</label>
                            </div>
                        ))}
                              </div>


                                  <div className="w-[50%] relative left-[17%] m-12 h-10">
                                  <input type="submit" name="" className="w-[100%] border-2 bg-[#1999a6] h-full rounded-xl" />
                                  </div>
                          </form>
                          </div>
       </div>
        
      )
    }
    export default Creae_Pets;