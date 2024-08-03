import { useEffect, useState } from "react"
import Header from "./Component/Header"
import { Sidebar } from "./Component/Siderbar/siderbar"
import axiosClient from "./utils/axiosClent"


const Adoptar = ()=>{
    const [adoptantes, setadoptantes]= useState([])
    const [mascota, setmascota]= useState([]);
    

    const [adoptar, setAdoptar]= useState({
        id_adoptante:'',
        edad:'',
        id_mascota:'',
        estado:''
     })
 
    const user= async()=>{
        const listar_user = await axiosClient.get("/listar_user")
        setadoptantes(listar_user.data)
        console.log("adoptantes",listar_user.data)
    }

   const mascotas = async()=>{
        
        const mascotas = await axiosClient.get("/listar_no_adoptados") 
        setmascota(mascotas.data)
        console.log("mascotas2",mascotas.data)
    }

    const handinputchange = (event) => {
        const { name, value } = event.target;
        setAdoptar((prevadop) => {
          const updatedUsuarios = {
          ...prevadop,
            [name]: value
          };
          console.log('Updated usuarios:', updatedUsuarios);
          return updatedUsuarios;
        });
      }
     
      const crear_adopcion = async (e) => {
        e.preventDefault(); 
        try {
          const respuesta = await axiosClient.post("/crear_adopcion", adoptar);
          console.log("Respuesta del servidor:", respuesta.data.mensaje);
          
          if (respuesta.status===200) {
            Swal.fire({
              icon: "success",
              title: "Adopcion",
              text:respuesta.data.mensaje,
              showConfirmButton: true,
              timer: 3500
            })
           

          }
        } catch (error) {
          console.log("Error al crear la adopción:", error);
        }
      };
    useEffect(()=>{
        user();
        mascotas()
    },[])

    
    return(
        <>
        <Header/>
        <Sidebar/>
        <div className="relative top-20 left-[17%] rounded-xl  w-[80%] h-full border-b border-b-[#1999a6] border-t border-t-[#1999a6] border-b border-b-[#1999a6] h-16  border-r border-r-[#1999a6] border-l border-l-[#1999a6] bg-[#b7f0f5]">
        <h1 className="text-4xl mb-10">Adoptar Una Macota</h1>
            <form onSubmit={crear_adopcion}>
            <label>Seleccione el usuario Adoptante</label>
            <br />
            <select name="id_adoptante" onChange={handinputchange}  className="w-[30%] h-11  text-center rounded-lg focus-within:">
                <option hidden>Seleccion....</option>
                {adoptantes .map((usuario)=>(
                    <option key={usuario.id} value={usuario.id}>{usuario.id} {usuario.nombre}</option>
                ))}
            </select>
            <br />
            <label>Ingresa Tu Edad</label>
            <br />
            <input type="number" name="edad" placeholder="Edad...." onChange={handinputchange}  className="w-[30%] h-11  text-center rounded-lg focus-within:"/>
            <br />
            <label>Seleccione la mascota que desea adoptar </label>
            <br />
            <select name="id_mascota" onChange={handinputchange}  className="w-[30%] h-11  text-center rounded-lg ">
            <option hidden>Seleccion....</option>
            {mascota .map((mascota)=>(
                <option value={mascota.id} key={mascota.id}>{mascota.id} {mascota.nombre_mas}</option>
            ))}
            </select>
            <br />
            <label>Seleccione el estado con el que desea iniciar la adopcion </label>
            <br />
            <select name="estado" onChange={handinputchange} className="w-[30%] h-11  text-center rounded-lg ">
            <option hidden>Seleccion....</option>
            <option value="Pendiente">Pendiente</option>
            </select>
            <br />
            <input type="submit" name="" className="border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-l border-l-[#1999a6]  border-r border-r-[#1999a6] w-[30%] mt-5 mb-5 rounded-xl cursor-pointer" />
            </form>
        </div>
        </>
    )
}

export default Adoptar