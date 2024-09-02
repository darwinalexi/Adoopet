import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../utils/axiosClent";
import { useState } from "react";

function Create_depart({onclose }) {
const [valor, setvalor]= useState({
nombre:'',
codigo_dane:''
})

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setvalor((prevdato) => {
          return { ...prevdato, [name]: value };
        });
        console.log("valores",valor)
      };
    const crear=async(e)=>{
        e.preventDefault();
        if (!valor.nombre  || !valor.codigo_dane) {

            Swal.fire({
                icon: "error",
                text:"Llene los campos",
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        if (!valor.nombre.trim() || !/^[a-zA-Z\s]*$/.test(valor.nombre)) {
          Swal.fire({
            icon: "error",
            text: "El nombre debe ser un texto",
            showConfirmButton: false,
            timer: 1500
          })
          return;
        }
        try {
            const  crear= await axiosClient.post(`/departamento`, valor)
            console.log(crear.data.mensaje)
            Swal.fire({
                icon: "success",
                title: "",
                text:crear.data.mensaje,
                showConfirmButton: true,
                timer: 1500
              })
              window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full  z-10">
      <div className="bg-white w-[56%]  grid grid-rows-1  gap-0 h-[75%] relative top-[22%] left-[23%] rounded-2xl flex justify-center">
        <div className="relative  h-[89%] "> <button className="relative left-[45%]" onClick={onclose}>  <FontAwesomeIcon icon={faClose}  className='size-12 m-5'/></button>
          <h1 className="size-14 relative left-[46%] ">Crea Un Departamewnto</h1>
          <form onSubmit={crear} className="relative top-[14%]">
            
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
              id=""
             
              placeholder="Ingrese el código Dane"
              onChange={handleInputChange}
            />
            <input
              type="submit"
              className="bg-sky-800 p-4 w-full m-2 rounded-full text-white"
              value="Actualizar"
            />
          </form>
        </div>
      </div>
    </div>
    )
}

export default Create_depart;