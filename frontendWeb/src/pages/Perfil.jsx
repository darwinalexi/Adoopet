import { useState, useEffect } from "react";
import Header from "./Component/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Sidebar } from "./Component/Siderbar/siderbar";
import axiosClient from "./utils/axiosClent";
import Swal from "sweetalert2";
const Perfil = () => {
    const [usuario, setUsuario] = useState([]);
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setIdUser] = useState([]);
    const [user, setUser] = useState({
        nombre: '',
        email: '',
        password: '',
        tipo: ''
    });
    const [createPet, setCreatePet] = useState(false);
    const [crear, setCrear] = useState(null);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
        if (usuarios.length > 0) {
            const usuario = usuarios[0];
            setUsuario(usuario.tipo || 'Invitado');
            setName(usuario.nombre);
            setEmail(usuario.email);
            setIdUser(usuario.id);
        }
    }, []);

    useEffect(() => {
        if (id) {
            listAdoptedPets();
        }
    }, [id]);

    const listAdoptedPets = async () => {
        try {
            const listar = await axiosClient.get(`/listas_pets_adop/${id}`);
            setPets(listar.data);
            console.log("adop", listar.data)
        } catch (error) {
            console.log(error);
        }
    };

    const registerUser = async (e) => {
        try {
            e.preventDefault();
            const crear = await axiosClient.post("/crear", user);
            setCrear(crear.data.mensaje);
            console.log(crear.data.mensaje)
            Swal.fire({
                icon: "success",
                title: "",
                text:crear.data.mensaje,
                showConfirmButton: true,
                timer: 1500
              })
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <>
            <Header />
            <Sidebar />
           
            {usuario === "Administrador" && (
                <>
                    <div className="relative top-24 left-[17%] w-[13%] -z-50">
                        <h1 className="flex justify-start size-16 font-extrabold w-[100%]">Perfil de Usuario</h1>
                        <p className="flex justify-start pb-6">Nombre: {username}</p>
                        <p className="flex justify-start pb-6">Tipo: {usuario}</p>
                        <p className="flex justify-start pb-6">Correo: {email}</p>
                    </div>

                    <div className="bg-slate-200 w-[45%] absolute left-[50%] top-[34%] rounded-3xl -z-20 border-t border-t-[#1999a6]  border-l border-l-[#1999a6] border-t border-r-[#1999a6]">
                        <h1>Crear Usuario</h1>
                        <form onSubmit={registerUser} onChange={handleInputChange} >
                            <div className="w-[50%] relative left-[24%]">
                                <label>Ingrese el nombre</label>
                                <br />
                                <FontAwesomeIcon icon={faUser} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                                <input type="text" name="nombre" placeholder="Ingrese el nombre" className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                            </div>
                            <br />
                            <div className="w-[50%] relative left-[24%]">
                                <label>Ingrese el correo</label>
                                <br />
                                <FontAwesomeIcon icon={faEnvelope} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                                <input type="email" name="email" placeholder="Ingrese el correo" className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                            </div>
                            <br />
                            <div className="w-[50%] relative left-[24%]">
                                <label>Ingrese Clave</label>
                                <br />
                                <FontAwesomeIcon icon={faLock} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                                <input type="password" name="password" placeholder="Ingrese la contraseña" className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                            </div>
                            <br />
                            <label>Seleccione su rol</label>
                            <br />
                            <select name="tipo" id="" onChange={handleInputChange} className="w-[50%] h-11 text-center rounded-lg focus-within:invalid">
                                <option hidden>Seleccione...</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Usuario">Usuario</option>
                            </select>
                            <br />
                            <input type="submit" value="Registrar" className="mt-7 w-[50%] h-11 text-center rounded-lg  border-t  border-t-[#1999a6] border-b border-b-[#1999a6]  border-r border-r-[#1999a6] border-l border-l-[#1999a6] hover:bg-[#1999a6] cursor-pointer" />
                        </form>
                    </div>
                </>
            )}

            {usuario === "Usuario" && (
                <>
                    <div className="relative top-24 left-[17%] w-[17%] -z-50">
                        <h1 className="flex justify-start size-16 font-extrabold w-[100%]">Perfil de Usuario</h1>
                        <p className="flex justify-start pb-6">Nombre: {username}</p>
                        <p className="flex justify-start pb-6">Tipo: {usuario}</p>
                        <p className="flex justify-start pb-6">Correo: {email}</p>
                    </div>

                <div className="grid grid-cols-1 md:grid-cols-3  h-[32%]   w-[80%] absolute left-[10%] top-[65%]  mb-14 gap-5">
                    <h1 className="col-span-full  font-bold text-4xl   h-full">Adopciones Realizadas</h1>
                        {pets.map((pet) => (
                            <div key={pet.id} className="h-[54%] w-[53%] top-[35%] border-t-[#1999a6]  rounded-xl grid-rows-2 border-b border-b-[#1999a6] border-l border-l-[#1999a6] border-r border-r-[#1999a6] ">
                                <div className="w-full h-[70%]">
                                     <img src={`http://localhost:4001/img/${pet.foto}`} className="h-full w-full rounded-lg"/>
                                </div>
                                <div className="p-4  relative bottom-0">
                                    <h1 className="font-bold">Nombre Mascota: {pet.nombre_mas}</h1>
                                    <p className="text-sm">Descripcion: {pet.descripcion}</p>
                                    <p className="text-sm">Edad: {pet.edad} años</p>
                                </div>
                            </div>
                        ))}
                </div>


                </>
            )}
        </>
    );
};

export default Perfil;