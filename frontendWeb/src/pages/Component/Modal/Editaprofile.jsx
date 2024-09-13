import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../utils/axiosClent";
//SE RECIBE Y MANDA PARAMETROS PROFILE RECIBE LO DEL USER Y CLOSEMODAL DA ORDEN PARA CERRAR EL MODAL 
const Editarperfil = ({ closeModal, profile }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);

//deja o no ver la clave 
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    if (!modalVisible) return null;

    const nombre = useRef(null)
    const celular = useRef(null)
    const correo = useRef(null)
    const tipo_de_documento = useRef(null)
    const documento= useRef(null)
    const foto= useRef(null)
    const direccion = useRef(null);
    const clave = useRef(null);


const actualizar_profile= async(e )=> {
    e.preventDefault();
    const claveValida = clave.current.value.length >= 8 && clave.current.value.length <= 16;
    if (!claveValida) {
        Swal.fire({
            icon: "error",
            title: "",
            text :"la clave tiene que ser minimo  8 caracteres y maximo 16",
            showConfirmButton: true,
            timer: 3000
          })
          return;
    }
    try {
        const datos = new FormData();
        datos.append('nombre',nombre.current.value);
        datos.append('email', correo.current.value);
        datos.append('telefono', celular.current.value);
        datos.append('tipo_de_documento',tipo_de_documento.current.value);
        datos.append('documento',documento.current.value);
        datos.append('direccion',direccion.current.value);
        datos.append('password',clave.current.value);

        datos.append('foto',foto.current.files[0])
        const actualizar = await axiosClient.put(`/actualizar/53`,datos)
            Swal.fire({
                icon: "success",
                title: "",
                text:actualizar.data.mensaje,
                showConfirmButton: true,
                timer: 3000
              })
        
     
        window.location.reload();

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "",
            text:"Revisa los datos tal vez estan en nuestra Base de Datos",
            showConfirmButton: true,
            timer: 3000
          })
    }
}

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-full">
            <div className="bg-white p-8 rounded-lg relative h-[64%] overflow-y-scroll ">
                <button onClick={closeModal} className="absolute top-2 right-2 text-red-500 z-50">
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
                <br />
                <form onSubmit={actualizar_profile}>
                    <label>Ingrese un Nombre</label>
                    <br />
                    <input type="text"
                     defaultValue={profile.nombre}
                     required ref={nombre}
                    className=" p-3 border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] block w-full mb-4 focus:outline-none" />
                    <br />
                    <label>Ingrese el   No°  de Celular</label>
                    <input 
                    type="text" 
                    required ref={celular}
                    defaultValue={profile.telefono}
                    className=" p-3 border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] block w-full mb-4 focus:outline-none" 
                    />
                       <label>Ingrese el  su Correo</label>
                     <input 
                    type="email" 
                    required ref={correo}
                    defaultValue={profile.email}
                    className=" p-3 border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] block w-full mb-4 focus:outline-none" 
                    />
                      <label>Seleccione su tipo de dcumento</label>
                      <select
                        defaultValue={profile.tipo_de_documento}
                        required ref={tipo_de_documento}
                        className="p-3 border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] block w-full mb-4 focus:outline-none"
                    >
                        <option value="" hidden>Seleccione...</option>
                        <option value="Cedula">Cédula</option>
                        <option value="Cedula Extranjera">Cédula Extranjera</option>
                    </select>
                    <label>Ingrese el  su   Documento</label>
                    <input 
                     type="number" 
                     required ref={documento}
                     defaultValue={profile.documento}
                     className=" p-3 border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] block w-full mb-4 focus:outline-none" 
                    />
                    <label>Ingresa Una Foto</label>
                    <input 
                     type="file" 
                     ref={foto}
                     className=" p-3 border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] block w-full mb-4 focus:outline-none" 
                    />
                      <label>Ingrese el  su   Direccion</label>
                    <input 
                     type="text" 
                     required ref={direccion}
                     defaultValue={profile.direccion}
                     className=" p-3 border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] block w-full mb-4 focus:outline-none" 
                    />
                   <div>
                    <label>Actualice o reescriba su clave</label>
                        <input 
                            /*depende de un estado para ver o no ver la clave  */
                                type={passwordVisible ? "text" : "password"}
                         ref={clave} className=" p-3 border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] block w-full mb-4 focus:outline-none" 
                            />
                        <div>
                        <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-[12%] top-[192%]"
                                >    /{/*permite cambiar icono segun correspnda el estado del input   */}
                                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} color="#1999a6"  className="size-8"/>
                            </button>
                        </div>
                   </div>
                        <input type="submit"  className="bg-[#1999a6] w-full rounded-lg h-[8%]" />
                </form>
            </div>
        </div>
        
    );
};

export default Editarperfil;
