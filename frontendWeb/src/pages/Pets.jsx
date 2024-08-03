import { useEffect, useState } from 'react';
import Header from './Component/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axiosClient from './utils/axiosClent';
import { Sidebar } from './Component/Siderbar/siderbar';


const Pets = () =>{
const [mascotas, setmascotas]= useState([]);
const listar_mascotas= async()=>{
  try {
    
    const listar= await axiosClient.get("/listar_pets")
    setmascotas(listar.data)
    console.log("mascot",listar.data)
  } catch (error) {
    console.log(error)
  }
}



const borrar_mascota= async(id)=>{
  try {
    const borrar= await axiosClient.delete(`/eliminar_pets/${id}`)
    console.log(borrar)
    window.location.reload();
  } catch (error) {
    console.log(error)
  }
}



useEffect(()=>{
listar_mascotas();
},[])


return(
  <>
  <Header/>
  <Sidebar/>
  <div className='w-[90%] grid grid-cols-3 gap-[7%] relative lg:left-20 top-24 '>
  {mascotas .map((pet)=>(
    <div key={pet.id} value={pet.id} className='border-spacing-20 h[24%] rounded-xl w-80  border-[5px] border-t  border-t-[#1999a6] border-b border-b-[#1999a6] border-l border-l-[#1999a6] border-r border-r-[#1999a6]  '>
      <img src={`http://localhost:4001/img/${pet.foto}`}  className="w-full h-[50%]  rounded-xl" />
      <h1>nombre: {pet.nombre_mas}</h1>
      <p>edad: {pet.edad} años</p>
      <p>descripcion: {pet.descripcion}</p>
      <p>estado: {pet.estado}</p>
        <button onClick={()=>borrar_mascota(pet.id)}><FontAwesomeIcon icon={faTrashAlt} className="size-8 mt-7" color='red'/> </button>
    </div>
  ))}
  </div>
  </>
)


};

export default Pets;