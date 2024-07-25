import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import axiosClient from "./utils/axiosClent";
const Create_Pets = () => {
    const [valores, setvalores] = useState({
        categoria_id: '',
        foto: null, 
        raza:'',
        genero_id: '',
        nombre_mas:''
    });
    

    const formData = new FormData();
    const [mascota, setmascotas]=useState([])

    const [razas, setrazas]=useState([]);
    const [genero, setgenero]=useState([]);

    const  listar_categorias=async()=>{
            const mostra= await axiosClient.get("/listar_categories")
            setmascotas(mostra.data)
            console.log("categori".mostra.data);
  
    }

    const  listar_razas=async()=>{
        try {            
            const mostraraza= await axiosClient.get("/listar_races");
            setrazas(mostraraza.data)
            console.log("razas",mostraraza)
        } catch (error) {
            console.log(error)
        }
    }

    

const listar_genero=async()=>{
    try {
        const trar=await axiosClient.get("/listar_gender",)
        setgenero(trar.data)
        console.log("gender",trar.data)
    } catch (error) {
        console.log(error);
    }
}

    useEffect(()=>{
        listar_categorias();
        listar_razas();
        listar_genero();
    },[])

    const handinputchange=(event)=>{
        setvalores({
          ...valores,
          [event.target.name]:event.target.value
        })
        console.log(valores)
      }


      const crear_mascotas = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(valores).forEach(key => {
            formData.append(key, valores[key]);
        });
    
        // Capturar el archivo seleccionado
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput.files && fileInput.files[0]) {
            formData.append('foto', fileInput.files[0]);
        }
    
        try {
            
            const response = await axiosClient.post('http://localhost:4001/crear_pets',formData,);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.mensaje,
                    showConfirmButton: false,
                    timer: 1500
                  })
            } else {
                console.log(response.data.mensaje);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    
   


    return (
        <>
            <div className="bg-gray-900   flex-col h-1/2 w-full   mr">
            <h1 className="text-white">REGISTRA A TU MASCOTA</h1>
            <form onSubmit={crear_mascotas}>
                <div className="rounded-full flex justify-center">
                    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fes%2Fvectors%2Ffoto-de-perfil-en-blanco-973460%2F&psig=AOvVaw1M4npJveOQWWo5moyJlvPk&ust=1716501041679000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCyvumeooYDFQAAAAAdAAAAABAE" alt="Your Image" className="w-20 h-20" />
                </div>
                <label className="text-white">Ingrese el nombre</label>
                <br />
                <input className="bg-gray-500 w-60 rounded-full placeholder:pl-14" type="text" name="nombre_mas" placeholder="ingrese el nombre" onChange={handinputchange} />
                <br />
                <label className="text-white">Ingresar raza</label>
                <br />
                
                <select name="raza"  onChange={handinputchange} className="bg-gray-500 w-60 rounded-full placeholder:pl-14">
                <option value="">seleccionar raza</option>
                {razas.map((raza)=>(
                        <option key={raza.id} value={raza.id}>{`${raza.nombre_r} (${raza.id})`}</option>
                    ))}
               </select>
               
                <br />
               
                <label  className="text-white">Categoría</label>
                <br />
                <select name="categoria_id" id="" onChange={handinputchange} className="bg-gray-500 w-60 rounded-full placeholder:pl-14">
                    <option value="" hidden>seleccione una categoria  </option>
                    {mascota.map((categoria)=>(
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                    ))}
                </select>
               
                <br />
               
                <label className="text-white">Sube tu imagen de tu mascota</label>
                <br />
                <input type="file" name="foto" onChange={handinputchange} className="bg-gray-500 w-60 rounded-full placeholder:pl-14"/>
                <br />
                <label className="text-white">Género</label>
                <br />
                <select name="genero_id" id=""  onChange={handinputchange} className="bg-gray-500 w-60 rounded-full placeholder:pl-14">
                    {genero.map((generos)=>(
                        <option key={generos.id} value={generos.id}>{generos.nombre}</option>
                    ))}
                </select>
                <br />
                <input type="submit" value="Crear" className="text-white bg-green-700 w-1/5 m-12"/>
            </form>
            </div>
        </>
    );
};

export default Create_Pets;
