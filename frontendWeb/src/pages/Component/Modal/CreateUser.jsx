import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faEnvelope, faUser, faLock, faHome, faPhone, faIdCard } from "@fortawesome/free-solid-svg-icons"
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
        
        const validarCampoNumerico = (valor) => {
            // Verifica si el valor tiene exactamente 10 dígitos
            return /^\d{10}$/.test(valor);
        };

        const validarPassword = (password) => {
            return password.length >= 8 && password.length <= 16;
        };
        if (!validarPassword(claver.current.value)) {
            Swal.fire({
                icon: "error",
                title: "",
                text: "La contraseña debe ser mínimo 8 caracteres y máximo 16",
                showConfirmButton: true,
                timer: 3000
            });
            return;
        }
        const telefono = telefonor.current.value;
        const documento = documentor.current.value;
        if (telefono && !validarCampoNumerico(telefono)  ||  documento && !validarCampoNumerico(documento)) {
            Swal.fire({
                icon: "error",
                title: "",
                text: "los campos numericos deben tener exactamente 10 dígitos",
                showConfirmButton: true,
                timer: 1500
            });
            return;
        }
        if (!nombre || !email  || !tipo || !password || !tipo || !direccion || !celular  || !numero_documento || !tipo_documento ) {
            Swal.fire({
                icon: "error",
                title: "",
                text:"Llena los campos",
                showConfirmButton: true,
                timer: 1500
              })
              return;
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
            const crear = await axiosClient.post("/crear", datos);
            
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
                    text: "No se pudo crear el usuario, Posiblemente Esten En La Base De Datos Algunos Datos",
                    showConfirmButton: true,
                    timer: 3500
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
                         <input type="text" required ref={nombrer} placeholder="Ingrese el nombre"  className="rounded-xl text-center  border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none"  />
                     </div>
                     
                     <br />
                     
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese el correo</label>
                         <br />
                         <FontAwesomeIcon icon={faEnvelope} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                         <input type="email" required ref={correor}  placeholder="Ingrese el correo"  className="rounded-xl text-center border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none" />
                     </div>
                     
                     <br />
                     
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese Clave</label>
                         <br />
                         <FontAwesomeIcon icon={faLock} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                         <input type="password" required ref={claver}  placeholder="Ingrese la contraseña" className="rounded-xl text-center border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none"  />
                     </div>

                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Seleccione su foto de Perfil</label>
                         <br />
                         <input type="file" required ref={fotor} className="rounded-xl border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none text-center"  />
                     </div>
                     
                     <br />
                    <div className="w-[90%] ml-4">
                    <label>Seleccione el rol</label>
                                        <br />
                                        <select required ref={tipor}  className=" rounded-lg text-center border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none " >
                                            <option hidden>Seleccione...</option>
                                            <option value="Administrador">Administrador</option>
                                            <option value="Usuario">Usuario</option>
                                        </select>
                    </div>
                     <br />
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese La direccion</label>
                         <br />
                         <FontAwesomeIcon icon={faHome} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                         <input type="text" required ref={direccionr} placeholder="Ingrese su direccion de domicilio" className=" text-center rounded-xl border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none" />
                         <br />
                     </div>
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese el Telefono</label>
                         <br />
                         <FontAwesomeIcon icon={faPhone} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                         <input type="number" required ref={telefonor} placeholder="Ingrese el número de telefono" className=" text-center rounded-xl border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none"  />
                         <br />
                     </div>
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Ingrese el documento de Identidad </label>
                         <br />
                         <FontAwesomeIcon icon={faIdCard} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                         <input type="number" required ref={documentor} placeholder="Ingrese el número de identificación" className="text-center rounded-xl border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none" />
                         <br />
                     </div>
                     <div className="w-[90%] ml-5 rounded-lg">
                         <label>Seleccione el tipo de documento de Identidad </label>
                         <br />
                         <select required ref={tipo_de_docr}  className="rounded-xl border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] focus:outline-none" >
                             <option  hidden>Seleccione...</option>
                             <option value="Cedula">Cedula</option>
                             <option value="Cdula Extrnjera">Cedula Extranjera</option>
                         </select>
                         <br />
                     </div>
                     <input type="submit" value="Registrar" className="rounded-xl mt-7 w-[50%] h-11 text-center rounded-lg  border-t  border-t-[#1999a6] border-b border-b-[#1999a6]  border-r border-r-[#1999a6] border-l border-l-[#1999a6] hover:bg-[#1999a6] cursor-pointer focus:outline-none" />
                 </form>
             </div>
        </div>

    )
};

 export default Create_User;
