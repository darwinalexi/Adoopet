import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosClient from "../../utils/axiosClent";
import Swal from 'sweetalert2';
import Header from "../Header";

function Municicipioscreate({onclose}){
    const [dato, setdato] = useState({
        nombre:'',
        codigo_dane:''
      });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setdato((prevdato) => {
          return { ...prevdato, [name]: value };
        });
        console.log("valores",dato)
      };

      const crear_municipio= async(e)=> {
                e.preventDefault();
                if (!dato.nombre  || !dato.codigo_dane) {
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
            const crear= await axiosClient.post("/crear_municipios", dato)
            console.log(crear.data.mensaje)
            Swal.fire({
                icon: "succes",
                text:crear.data.mensaje,
                showConfirmButton: false,
                timer: 1500
            })
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
      }
    
    return(
    < >
      <Header/>
      <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
                <div className="bg-white w-[56%]  grid grid-rows-1  gap-0 h-[75%] relative top-[17%] left-[23%] rounded-2xl flex justify-center">
                <div className="relative  h-[89%] ">
                        <button className="relative left-[45%]" onClick={onclose}>  <FontAwesomeIcon icon={faClose}  className='size-12 m-5'/></button>
                        <h1 className="size-14 relative left-[46%] ">Crear  Municipio</h1>
                        <form onSubmit={crear_municipio} className="relative top-[10%]">
                            
                            <label>Nombre</label>
                            <input
                            type="text"
                            className="w-full h-[3%] color-[#0000] rounded-full opacity-50 placeholder:text-slate-400 focus:outline-none p-4 bg-custom-gray border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] relative top-[35%]"
                            name="nombre"
                            
                            placeholder="Ingrese el nombre"
                            onChange={handleInputChange}
                            />
                            <label>Codigo Dane</label>
                            <input
                            type="number"
                            className="w-full h-[3%] color-[#0000] rounded-full opacity-50 placeholder:text-slate-400 focus:outline-none p-4 bg-custom-gray border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] relative top-[65%]"
                            name="codigo_dane"
                            placeholder="Ingrese el código Dane"
                            onChange={handleInputChange}
                            />
                            <input
                            type="submit"
                            className="bg-sky-800 p-4 w-full m-2 rounded-full text-white"
                            value="Crear"
                            />
                        </form>
                        </div>
                </div>
        </div>
    </>
    )
}

export default Municicipioscreate;