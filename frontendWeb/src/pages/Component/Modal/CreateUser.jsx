import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"
import axiosClient from "../../utils/axiosClent"
import Swal from "sweetalert2"




 function Create_User({onclose}) {
    const nombrer= useRef(null)
    const correor =useRef(null)
    const claver=useRef(null)
    const fotor = useRef(null)
    const tipor = useRef(null)
    const direccionr= useRef(null)
    const telefonor= useRef(null)
    const documentor= useRef(null)
    const tipo_de_docr= useRef(null)
 
    const registerUser = async (e) => {
        e.preventDefault();
        const nombre = nombrer.current.value.trim()
        const email = correor.current.value.trim() 
        const tipo = tipor.current.value.trim() 
        const password = claver.current.value.trim() 
        const direccion = direccionr.current.value.trim() 
        const celular = telefonor.current.value.trim() 
        const numero_documento = documentor.current.value.trim()
        const tipo_documento = tipo_de_docr.current.value.trim() 
        const foto = fotor.current.files[0];
        
        if (!nombre || !email  || !tipo || !password || !tipo || !direccion || !celular  || !numero_documento || !tipo_documento ) {
            Swal.fire({
                icon: "error",
                title: "",
                text:"Llena los campos",
                showConfirmButton: true,
                timer: 1500
              })
        }

        try {
    
            const datos = new FormData();
            datos.append('nombre', nombre);
            datos.append('email', email);
            datos.append('password', password);
            datos.append('foto', foto);
            datos.append('tipo', tipo);
            datos.append('direccion', direccion);
            datos.append('telefono', celular);
            datos.append('documento', numero_documento);
            datos.append('tipo_de_documento', tipo_documento);
        console.log("datos",datos)
            const crear = await axiosClient.post("/crear", datos);
            
            console.log("respuesta",crear.data.mensaje)


             if (crear.status==404) {
                Swal.fire({
                    icon: "error",
                    title: "",
                    text:crear.data.mensaje,
                    showConfirmButton: true,
                    timer: 1500
                  })
            }else if (crear.status==200) {
                Swal.fire({
                    icon: "success",
                    title: "",
                    text:crear.data.mensaje,
                    showConfirmButton: true,
                    timer: 1500
                  })
            }
            
        } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "",
                    text: "No se pudo crear el usuario",
                    showConfirmButton: true,
                    timer: 1500
                });
            }
        }


    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg relative h-[89%] overflow-y-scroll">
             <button onClick={onclose}>  <FontAwesomeIcon icon={faClose} className="size-6"/> </button>
                 <h1>Crear Usuario</h1>
                 <form onSubmit={registerUser} >
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese el nombre</label>
                         <br />
                         <FontAwesomeIcon icon={faUser} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                         <input type="text" required ref={nombrer} placeholder="Ingrese el nombre"  className="text-center  border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none"  />
                     </div>
                     <br />
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese el correo</label>
                         <br />
                         <FontAwesomeIcon icon={faEnvelope} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                         <input type="email" required ref={correor}  placeholder="Ingrese el correo"  className=" text-center border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none" />
                     </div>
                     <br />
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese Clave</label>
                         <br />
                         <FontAwesomeIcon icon={faLock} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                         <input type="password" required ref={claver}  placeholder="Ingrese la contraseña" className="text-center border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none"  />
                     </div>
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Seleccione su foto de Perfil</label>
                         <br />
                     
                         <input type="file" required ref={fotor} className="border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none text-center"  />
                     </div>
                     <br />
                     <label>Seleccione el rol</label>
                     <br />
                     <select required ref={tipor}  className=" text-center border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none" >
                         <option hidden>Seleccione...</option>
                         <option value="Administrador">Administrador</option>
                         <option value="Usuario">Usuario</option>
                     </select>
                     <br />
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese La direccion</label>
                         <br />
                         <input type="text" required ref={direccionr} className="border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none" />
                         <br />
                     </div>
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese el Telefono</label>
                         <br />
                         <input type="number" required ref={telefonor} className="border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none"  />
                         <br />
                     </div>
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese el documento de Identidad </label>
                         <br />
                         <input type="text" required ref={documentor}  className="border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none" />
                         <br />
                     </div>
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Seleccione el tipo de documento de Identidad </label>
                         <br />
                         <select required ref={tipo_de_docr}  className="border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none" >
                             <option  hidden>Seleccione...</option>
                             <option value="Cedula">Cedula</option>
                             <option value="Cdula Extrnjera">Cedula Extranjera</option>
                         </select>
                         <br />
                     </div>
                     <input type="submit" value="Registrar" className="mt-7 w-[50%] h-11 text-center rounded-lg  border-t  border-t-[#1999a6] border-b border-b-[#1999a6]  border-r border-r-[#1999a6] border-l border-l-[#1999a6] hover:bg-[#1999a6] cursor-pointer focus:outline-none" />
                 </form>
             </div>
        </div>

    )
};

 export default Create_User;
