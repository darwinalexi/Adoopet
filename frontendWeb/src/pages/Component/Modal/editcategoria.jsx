import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axiosClient from "../../utils/axiosClent";



function  Editcategories({data, onclose}) {
    const [register, setregister] = useState({
        nombre: '',
        estado: ''
    });

    useEffect(() => {
        if (data) {
            setregister({
                nombre: data.nombre || '',
                estado: data.estado || ''
            });
        }
    }, [data]); // Dependencia en data para a

     

     

    const handinputchange = (event) => {
        const { name, value } = event.target;
        setregister(prevRegister => ({
            ...prevRegister,
            [name]: value
        }));
    };

    const actualizar_categoria = async (e) => {
    
        e.preventDefault();

      if (!register.nombre  || !register.estado) {
        Swal.fire({
            icon: "error",
            text:"Llene los campos",
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }
    if (!register.nombre.trim() || !/^[a-zA-Z\s]*$/.test(register.nombre)) {
        Swal.fire({
          icon: "error",
          text: "El nombre debe ser un texto",
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }
        try {
            const response = await axiosClient.put(`/actualizar_categories/${data.id}`, register);
               
                console.log(response.data.mensaje)
                onclose();
            Swal.fire({
                icon: "success",
                title: "Categoría actualizada",
                text: "La categoría ha sido actualizada exitosamente",
                showConfirmButton: true,
                timer: 3500
            });
            window.location.reload();
        } catch (error) {
            console.log("Error al actualizar la categoría:", error);
        }
    };

  return(
    <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-full">
        <div className="bg-white p-8 rounded-lg relative h-[64%] w-[56%] ">
                    <button onClick={onclose} className="absolute top-6 right-6">
                        <FontAwesomeIcon icon={faClose} className="size-11"/>
                    </button>
                   
                    <form onSubmit={actualizar_categoria} className="relative top-[14%]">
                    <h1>Actualizar Categoria</h1>
                        <label>Ingrese El Nombre</label>
                        <br />
                        <input
                            type="text"
                            name="nombre"
                            className="w-full h-[3%] color-[#0000] rounded-full opacity-50 placeholder:text-slate-400 focus:outline-none p-4 bg-custom-gray border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] relative top-[35%]"
                            placeholder="Ingrese El Nombre de La Categoria"
                            value={register.nombre}
                
                            onChange={handinputchange}
                        />
                        <br />
                        <label>Seleccione Un Estado</label>
                        <br />
                        <select
                            className="w-full h-[3%] color-[#0000] rounded-full opacity-50 placeholder:text-slate-400 focus:outline-none p-4 bg-custom-gray border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] relative top-[35%]"
                            name="estado" value={register.estado}

                            onChange={handinputchange}
                        >
                            <option hidden>Seleccione</option>
                            <option value="Activo">Activo</option>
                            <option value="Desactivo">Desactivo</option>
                        </select>
                        <br />
                        <input
                            type="submit"
                     className="bg-sky-800 mt-4 w-full  p-3 rounded-full text-white"
                            value="Actualizar"
                        />
                    </form>
        </div>
    </div>
            
  )  
}

export default Editcategories;