import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import axiosClient from "../../utils/axiosClent";
import { useState } from "react";
function Create_catregories({onclose}) {

    const [register, setregister] = useState({
        nombre: '',
        estado: ''
    });

    const handleinputChange = (event) => {
        const { name, value } = event.target;
        setregister((prevdato) => {
          return { ...prevdato, [name]: value };
        });
        console.log("valores",register)
      };

    const crear_categoria = async (e) => {
   
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
            const response = await axiosClient.post("/crear_categories", register);
            setregister(response.data.mensaje); // Resetea el formulario
            close();
            Swal.fire({
                icon: "success",
                title: "Categoría creada",
                text: "La categoría ha sido creada exitosamente",
                showConfirmButton: true,
                timer: 3500
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Lo sentimos",
                text: "La categoría no ha poidido ser creada exitosamente",
                showConfirmButton: true,
                timer: 3500
            });
        }
    };
 return(
    <div className="bg-[#1999a6] absolute left-[25%] bottom-[28%] w-[45%] rounded-xl p-5">
    <button onClick={onclose} className="absolute top-2 right-2">
        <FontAwesomeIcon icon={faClose} />
    </button>
    <h1>Crear Categoria</h1>
    <form onSubmit={crear_categoria}>
        <label>Ingrese El Nombre</label>
        <br />
        <input
            type="text"
            name="nombre"
            className="w-[60%] border-2 bg-slate-200 h-full rounded-xl pl-5"
            placeholder="Ingrese El Nombre de La Categoria"
            value={register.nombre}
            onChange={handleinputChange}
        />
        <br />
        <label>Seleccione Un Estado</label>
        <br />
        <select
            className="w-[60%] border-2 bg-slate-200 h-full rounded-xl pl-5"
            name="estado"
            value={register.estado}
            onChange={handleinputChange}
        >
            <option hidden>Seleccione</option>
            <option value="Activo">Activo</option>
            <option value="Desactivo">Desactivo</option>
        </select>
        <br />
        <input
            type="submit"
            className="w-[60%] border-2 bg-slate-200 h-full rounded-xl mt-10 mb-20"
            value="Crear"
        />
    </form>
</div>
 )   
}


export default Create_catregories;