import { useEffect, useState } from "react"
import Header from "./Component/Header"
import axiosClient from "./utils/axiosClent"
import { Sidebar } from "../pages/Component/Siderbar/siderbar"

const Sow_pet=()=>{

  const  [user, setuser]= useState([]);
  
  const backgroundImageStyle = {
    backgroundImage: "url('./img/chispitas.JPG')",
    backgroundSize: "cover",
  }
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
      <div className="w-[90%] gap-36 grid-flow-row auto-rows-max bg-sky-400 mt-14 ml-56 w-[34%]">
            <div className="bg-red-400 w-[80%] h-[100%]  ml-24">
               <img src="./src/img/chiribico.jpeg" className="w-[100%] h-[100%] " />
            </div>
            <div >
              <h1>koko</h1>
              <p>En <p className="">ADOPPET</p></p>
            </div>
      </div>
    </>
)
}

export default Sow_pet;