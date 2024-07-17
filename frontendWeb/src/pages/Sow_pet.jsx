
import { useEffect, useState } from "react"
import axios from "axios"
import Header from "./Component/Header"
import { Menu } from "./Component/Menu"


const Sow_pet=()=>{

  const  [user, setuser]= useState([]);

  function createheader(token){
    return {
        headers:{
            'token':token
        }
    };
  }
  

    const count_user = async () => {
        try {
          const token= localStorage.getItem('token');
          const header= createheader(token)
          const listar = await axios.get("http://localhost:4001/contar_usuarios", header)
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
<Menu/>
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