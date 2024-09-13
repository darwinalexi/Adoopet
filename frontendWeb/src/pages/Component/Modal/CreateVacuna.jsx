import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosClient from "../../utils/axiosClent";

function CreateVacuna({onclose}){
    const [datos, setdatos]= useState({
        nombre:''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setdatos((prevdato) => {
          return { ...prevdato, [name]: value };
        });
        console.log("valores",datos)
      };

    const crear=async(e)=>{
        e.preventDefault();
        if (!datos.nombre ) {

            Swal.fire({
                icon: "error",
                text:"Llene los campos",
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }else if (!datos.nombre.trim() || !/^[a-zA-Z\s]*$/.test(datos.nombre)) {
          Swal.fire({
            icon: "error",
            text: "El nombre debe ser un texto",
            showConfirmButton: false,
            timer: 1500
          })
          return;
        }
        try {
            const crear = await axiosClient.post("/vacunas", datos)
            console.log(crear.data.mensaje)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    return(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-full">
            <div className="bg-white p-8 rounded-lg relative h-[64%]">
                <div>
                  <button  className=" flex justify-start m-6 " onClick={onclose}> <FontAwesomeIcon icon={faClose} className="size-12" /></button>
                  <h1 className="text-3xl mt-[18%]  font-medium">Crear  Vacuna</h1>
                </div>
               
               <div>
                <form className="relative top-[34%]" onSubmit={crear} >
                        <label className="relative top-[30%]">Ingrese el Nombre</label>
                        <input type="text"  name="nombre" onChange={handleInputChange} 
                        className="w-full h-[3%] color-[#0000] rounded-full opacity-50 placeholder:text-slate-400 focus:outline-none p-4 bg-custom-gray border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] relative top-[35%]"
                        />
                        <input
                                type="submit"
                                className="bg-sky-800 mt-4 w-full  rounded-full text-white"
                                value="Crear"
                                />

                    </form>
               </div>
        </div>
    </div>
    )
}

export default CreateVacuna;