import Header from "./Component/Header"
import { Menu } from "./Component/Menu"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import axiosClient from "./utils/axiosClent"


const Petsnadop =()=>{
const [mascotasp, setmascotasp]= useState([]);



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
            </div>
    ))}
</div>
   </>
)
}

export default Petsnadop