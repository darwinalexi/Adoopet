import { useEffect, useState } from "react"
import Header from "./Component/Header"
import { Sidebar } from "./Component/Siderbar/siderbar"
import axiosClient from "./utils/axiosClent"


const Adoptar = ()=>{
    const [adoptantes, setadoptantes]= useState([])
    const [mascota, setmascota]= useState([]);

    const [adoptar, setadoptar]= useState({
        id_adoptante:'',
        edad:'',
        id_mascota:'',
        estado:''
     })
 
    const user= async()=>{
        const listar_user = await axiosClient.get("/listar")
        setadoptantes(listar_user.data)
        console.log("adoptantes",listar_user.data)
    }

   const mascotas = async(req, res)=>{
        
        const mascotas = await axiosClient.get("/listar_no_adoptados") 
        setmascota(mascotas.data)
        console.log("mascotas2",mascotas.data)
    }

    const handinputchange = (event) => {
        const { name, value } = event.target;
        setadoptar((prevadop) => {
          const updatedUsuarios = {
          ...prevadop,
            [name]: value
          };
          console.log('Updated usuarios:', updatedUsuarios);
          return updatedUsuarios;
        });
      }
     
const crear_adopcion=async()=>{
    const crear = await axiosClient.post("/crear_adopcion", adoptar)
    setadoptar(crear.data.mensaje)
    console.log(crear.data.mensaje)
}
    useEffect(()=>{
        user();
        mascotas()
    },[])

    
    return(
        <>
        <Header/>
        <Sidebar/>
        <div className="relative top-20 left-[37%]  bg-orange-300 w-[43%]">
        <h1>Adoptar Una Macota</h1>
            <form onSubmit={crear_adopcion}>
            <label>Seleccione el usuario Adoptante</label>
            <br />
            <select name="id_adoptante" onChange={handinputchange}>
                <option hidden>Seleccion....</option>
                {adoptantes .map((usuario)=>(
                    <option key={usuario.id} value={usuario.id}>{usuario.id} {usuario.nombre}</option>
                ))}
            </select>
            <br />
            <label>Ingresa Tu Edad</label>
            <br />
            <input type="number" name="edad" placeholder="Edad...." onChange={handinputchange}/>
            <br />
            <label>Seleccione la mascota que desea adoptar </label>
            <br />
            <select name="id_mascota" onChange={handinputchange}>
            <option hidden>Seleccion....</option>
            {mascota .map((mascota)=>(
                <option value={mascota.id} key={mascota.id}>{mascota.id} {mascota.nombre_mas}</option>
            ))}
            </select>
            <br />
            <label>Seleccione el estado con el que desea iniciar la adopcion </label>
            <br />
            <select name="estado" onChange={handinputchange}>
            <option hidden>Seleccion....</option>
            <option value="Pendiente">Pendiente</option>
            </select>
            <br />
            <input type="submit" name="" id="" />
            </form>
        </div>
        </>
    )
}

export default Adoptar