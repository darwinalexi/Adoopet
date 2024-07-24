import { useEffect, useState } from "react"
import Header from "./Component/Header"
import axiosClient from "./utils/axiosClent"
import { Sidebar } from "../pages/Component/Siderbar/siderbar"

const Sow_pet=()=>{

  const  [user, setuser]= useState([]);
  

    const count_user = async () => {
        try {
          const listar = await axiosClient.get("http://localhost:4001/contar_usuarios")
          const resultado= (listar,JSON.stringify.listar.data)
          console.log(resultado.data)
          setuser()
        } catch (error) {
          console.log(error)
        }
      }
    
    useEffect(()=>{
count_user();
    },[])
return(
    <>
<Header/>
<Sidebar/>
<div className="w-[80%] grid-cols-4 bg-sky-400 mt-14 ml-56 w-[34%]">
  <div>Usuarios</div>
  <div>Adopciones</div>
  <div>Por Adoptar</div>
  <div>Pendientes Por Adoptar</div>
</div>
    </>
)
}

export default Sow_pet;