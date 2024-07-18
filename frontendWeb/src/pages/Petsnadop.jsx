import Header from "./Component/Header"
import { Menu } from "./Component/Menu"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons"
import axiosClient from "./utils/axiosClent"


const Petsnadop =()=>{
const [mascotasp, setmascotasp]= useState([]);
const[crear, setcrear]= useState(null)
const [createpet, setcreate]= useState(false);


const openmodal = (pet)=>{
    setcrear(pet)
    setcreate(true)
   
  }
  
  const close_modal=()=>{
    setcreate(false)
    }

    const listar_no_adop=async()=>{
        try {
            const listar= await axiosClient.get("/listar_pet_not_adop")
            setmascotasp(listar.data)
            console.log(listar.data)
        
        } catch (error) {
            console.log(error)
        }
    }
    
    const borrar_mascota= async(id, e)=>{
        try {
          e.preventDefault();
          const borrar= await axiosClient.delete(`/eliminar_pets/${id}`)
          setmascotasp(borrar.data)
          console.log(borrar)
        } catch (error) {
          console.log(error)
        }
      }
      
    useState(()=>{
     listar_no_adop();
    },[])

   const editar_mascota= async()=>{
    try {
        
    } catch (error) {
        
    }
   }

return(
   <>
    <Header/>
    <Menu/>
<div className="ml-32 w-[80%] grid grid-cols-3 gap-[7%] mt-10">
    {mascotasp .map((mascota)=>(
        <div key={mascota.id}  value={mascota.id} className="w-80   border-spacing-20 border-[5px] border-t-orange-600 rounded-xl border-b-orange-600 border-l-orange-600 border-r-orange-600  ml-32 mt-14">
            <img src={`http://localhost:4001/img/${mascota.foto}`}  className=" w-full h-[50%]  rounded-xl " />
            <p>Nombre: {mascota.nombre_mas}</p>
            <p>Edad: {mascota.edad} años</p>
            <p>Descripcion: {mascota.descripcion}</p>
            <p>Estado: {mascota.estado}</p>
            <button onClick={borrar_mascota(mascota.id)}><FontAwesomeIcon icon={faTrashAlt}/></button>
            <button onClick={openmodal}><FontAwesomeIcon icon={faEdit}/></button>
            </div>
    ))}


{crear &&(
            <>
           
             <div className="bg-[] w-[35%] absolute left-[33%] top-16 overflow-y-scroll h-80 bg-orange-400">
             <button onClick={close_modal}><FontAwesomeIcon icon={faClose}/></button>
             <h2>Actualizar Macota</h2>
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

</div>
   </>
)
}

export default Petsnadop