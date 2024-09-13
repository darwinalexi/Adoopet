import { useState, useRef } from "react";
import axiosClient from "../../utils/axiosClent";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Edituse({data, onclose}) {
    const [update, setUpdate] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [passwordvisible, setPasswordVisible]= useState(false)


    const nombreref = useRef(null);
    const emailref = useRef(null);
    const tipoRef = useRef(null);
    const claveref= useRef(null)
    const fotoref= useRef(null)
    const direccionref= useRef(null)
    const telefonoref = useRef(null)
    const documentoref= useRef(null)
    const tipo_documentoref= useRef(null)
   
const toogle  = () => {
 setPasswordVisible(!passwordvisible)
}
    const actualizar = async (e) => {
        e.preventDefault(); 


        const nombre = nombreref.current.value.trim()
        const email = emailref.current.value.trim() 
        const tipo = tipoRef.current.value.trim() 
        const password = claveref.current.value.trim() 
        const direccion = direccionref.current.value.trim() 
        const celular = telefonoref.current.value.trim() 
        const numero_documento = documentoref.current.value.trim()
        const tipo_documento = tipo_documentoref.current.value.trim() 
        const foto = fotoref.current.files[0];
   
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("email", email);
        formData.append("password",  password);
        formData.append("tipo", tipo);
        formData.append("direccion", direccion);
        formData.append("telefono", celular);
        formData.append("documento", numero_documento);
        formData.append("tipo_de_documento", tipo_documento);
        if (foto) formData.append("foto", foto);


        const validarEmail = (email) => {
            // Expresión regular básica para validar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const validarCampoNumerico = (valor) => {
            // Verifica si el valor tiene exactamente 10 dígitos
            return /^\d{10}$/.test(valor);
        };

        const correo = emailref.current.value;
        if ( correo && !validarEmail(correo)) {
            Swal.fire({
                icon: "error",
                title: "",
                text: "Correo innvalido",
                showConfirmButton: true,
                timer: 1500
            });
            return;
        }
        const validarPassword = (password) => {
            return password.length >= 8 && password.length <= 16;
        };
        
       
        const telefono = telefonoref.current.value;
        const documento = documentoref.current.value;
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
        if (!nombre  || !email || !tipo || !direccion  || !celular  || !numero_documento || !tipo_documento) {
            Swal.fire({
                icon: "error",
                title: "",
                text: "los campos  deben ser llenados correctamente",
                showConfirmButton: true,
                timer: 1500
            });
            return;
        }
        if (!validarPassword(claveref.current.value)) {
            Swal.fire({
                icon: "error",
                title: "",
                text: "La contraseña debe ser mínimo 8 caracteres y máximo 16",
                showConfirmButton: true,
                timer: 3000
            });
            return;
        }
        
        try {
            const response = await axiosClient.put(`/actualizar/${data.id}`, formData )
            console.log(response.data.mensaje);
            onclose();
            window.location.reload();
        } catch (error) {
            console.log("Error al actualizar:", error);
        }
    };



    return(
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 overflow-y-scroll h-[70%]">
            <h2 className="text-xl mb-4">Actualizar Usuario</h2>
            <form onSubmit={actualizar}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        defaultValue={data.nombre}
                ref={nombreref}
                        className="border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Correo</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={data.email}
               ref={emailref}
                        className="border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Clave</label>
                    <input
                         type={passwordvisible ? "text" : "password"}
                        name="password"
                         ref={claveref}
                       
                        className="border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                    />
                              <button
                                    onClick={toogle}
                                    className="relative  bottom-9 left-[36%]"
                                >    /{/*permite cambiar icono segun correspnda el estado del input   */}
                                    <FontAwesomeIcon icon={passwordvisible ? faEyeSlash : faEye} color="#1999a6"  className="size-8"/>
                            </button>
                </div>
      
                <div className="mb-4">
                    <label className="block text-gray-700">Tipo</label>
                    <select
                
                        name="tipo"
                        defaultValue={data.tipo}
                        className="w-[100%] h-11 text-center rounded-lg border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                        ref={tipoRef}
                    >
                        <option hidden>Seleccione...</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Foto</label>
                    <input
                        type="file"
                        ref={fotoref}
                        className="border p-2 w-full border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                    />
                </div>
             
                <div className="mb-4 w-[100%]">
                    <label className="block text-gray-700">Direccion</label>
                    <input
                        type="text"
                         ref={direccionref}
                         defaultValue={data.direccion}
                        className="border p-2 w-[100%] border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                    />
                </div>

                <div className="mb-4 w-[100%]">
                    <label className="block text-gray-700">Numero de celular</label>
                    <input
                        type="number"
                         ref={telefonoref}
                         defaultValue={data.telefono}
                        className="border p-2 w-[100%] border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Tipo de documento</label>
                    <select
                
                        name="tipo"
                        defaultValue={data.tipo_de_documento}
                        className="w-[100%] h-11 text-center rounded-lg focus:outline-none border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                        ref={tipo_documentoref}
                    >
                        <option hidden>Seleccione...</option>
                        <option value="Cedula">Cedula</option>
                        <option value="Cedula Extrtanjera">Cedula Extranjera</option>
                    </select>
                </div>

                <div className="mb-4 w-[100%]">
                    <label className="block text-gray-700">Numero De Documento</label>
                    <input
                        type="number"
                         ref={documentoref}
                         defaultValue={data.documento}
                        className="border p-2 w-[100%] border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                    />
                </div>


                    <button
                        type="button"
                        onClick={onclose}
                        className="border-t-red-700 border-2 border-r-red-700 border-b-red-700 border-l border-l-red-700 text-black px-4 py-2 rounded mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-[#1999a1] text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </button>
              
            </form>
        </div>
    </div>
    )

}

export default Edituse;