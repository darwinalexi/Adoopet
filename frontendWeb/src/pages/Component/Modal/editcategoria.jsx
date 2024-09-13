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
            <div className="bg-[#1999a6] absolute left-[29%] w-[45%] rounded-xl p-5">
            <button onClick={onclose} className="absolute top-2 right-2">
                <FontAwesomeIcon icon={faClose} />
            </button>
            <h1>Actualizar Categoria</h1>
            <form onSubmit={actualizar_categoria}>
                <label>Ingrese El Nombre</label>
                <br />
                <input
                    type="text"
                    name="nombre"
                    className="w-[60%] border-2 bg-slate-200 h-full rounded-xl pl-5"
                    placeholder="Ingrese El Nombre de La Categoria"
                    value={register.nombre}
        
                    onChange={handinputchange}
                />
                <br />
                <label>Seleccione Un Estado</label>
                <br />
                <select
                    className="w-[60%] border-2 bg-slate-200 h-full rounded-xl pl-5"
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
                    className="w-[60%] border-2 bg-slate-200 h-full rounded-xl mt-10 mb-20"
                    value="Actualizar"
                />
            </form>
        </div>
  )  
}

export default Editcategories;