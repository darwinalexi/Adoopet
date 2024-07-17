import { useEffect, useState } from 'react';

import Header from './Component/Header';
import { Menu } from './Component/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axiosClient from './utils/axiosClent';


const Pets = () =>{
const [mascotas, setmascotas]= useState([]);

const listar_mascotas= async()=>{
  try {
    
    const listar= await axiosClient.get("/listar_pets")
    setmascotas(listar.data)
    console.log(listar.data)
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
  <Menu/>
  <div className=' ml-32 w-[90%] grid grid-cols-3 gap-[7%] mt-10'>
  {mascotas .map((pet)=>(
    <div key={pet.id} value={pet.id} className='border-spacing-20  rounded-xl w-80  border-[5px] border-t-orange-600 border-b-orange-600 border-l-orange-600 border-r-orange-600  ml-32'>
      <img src={`http://localhost:4001/img/${pet.foto}`}  className="w-full h-[50%]  rounded-xl" />
      <h1>nombre: {pet.nombre_mas}</h1>
      <p>edad: {pet.edad} años</p>
      <p>descripcion: {pet.descripcion}</p>
      <p>estado: {pet.estado}</p>
        <button onClick={()=>borrar_mascota(pet.id)}><FontAwesomeIcon icon={faTrashAlt}/> </button>
    </div>
  ))}
  </div>
  </>
)


};

export default Pets;