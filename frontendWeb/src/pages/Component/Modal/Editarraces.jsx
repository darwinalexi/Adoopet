import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosClient from "../../utils/axiosClent";
import Swal from "sweetalert2";


const EditRaces = ({ close, data }) => {
    const [dato, setdato] = useState({
        nombre: ''
    });

    if (!data) {
        console.log("paila")
    }

    const handinputchange = (event) => {
        const { name, value } = event.target;
        setdato((prevraces) => {
            const updatedraces = {
                ...prevraces,
                [name]: value
            };
            console.log('Updated  races:', updatedraces);
            return updatedraces;
        });
    }

    const actualizar_raza = async (e) => {
        e.preventDefault();
        if (!dato.nombre ) {
            Swal.fire({
                icon: "succes",
                text:"Llene los campos",
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        if (!dato.nombre.trim() || !/^[a-zA-Z\s]*$/.test(dato.nombre)) {
            Swal.fire({
              icon: "error",
              text: "El nombre debe ser un texto",
              showConfirmButton: false,
              timer: 1500
            })
            return;
          }
        try {

            const actualizar = await axiosClient.put(`/actualizar_races/${data.id}`, dato)
            console.log(actualizar.data.mensaje)
            Swal.fire({
                icon: "succes",
                title:"Processo Exitoso",
                text:actualizar.data.mensaje,
                showConfirmButton: false,
                timer: 2300
              })
         window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
                 <div className="bg-white w-[56%]  grid grid-rows-1  gap-0 h-[75%] relative top-[18%] left-[23%] rounded-2xl flex justify-center">
                <button onClick={close} className="absolute top-[37%] right-[34%]">
                    <FontAwesomeIcon icon={faClose} color="red" className="size-5" />
                </button>
                <h1 className="text-black text-3xl mb-4">Editar Raza</h1>
                <form onSubmit={actualizar_raza}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            name="nombre"
                            className="border p-2 w-full"
                            onChange={handinputchange}
                        />
                        <input type="submit" name="" id="" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditRaces;
