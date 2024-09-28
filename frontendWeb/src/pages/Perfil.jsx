import { useState, useEffect, useRef } from "react";
import Header from "./Component/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlus } from '@fortawesome/free-solid-svg-icons'
import { Sidebar } from "./Component/Siderbar/siderbar";
import axiosClient from "./utils/axiosClent";

import Editarperfil from "./Component/Modal/Editaprofile";
import Create_User from "./Component/Modal/CreateUser";
import { baseUrl } from "./utils/data";

const Perfil = () => {
    const [usuario, setUsuario] = useState([]);
    const [profile, setprofileUser] = useState([]);
    const [Editprofile,setprofile]= useState(false);
    const [fotos, setfoto]= useState([]);
    const [update, setupdate] = useState(false);
    const [user, setUser] = useState({
        nombre: '',
        email: '',
        password: '',
        tipo: ''
    });

    const [open, setopen]= useState(false);
    const [createPet, setCreatePet] = useState(false);
    const [crear, setCrear] = useState(null);
    const [pets, setPets] = useState([]);

    const Open =()=>{
        setopen(true)
    }
    const close=()=>{
        setopen(false)
    }
    const updateProfile=(profile)=>{
    setupdate(true)
    }
    const closeupdate=()=>{
        setupdate(false)
    }
        
const listar_profile=async()=>{
    try {
        const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
        const id_user = usuarios ? usuarios.id : '';
        const tipo= usuarios.tipo ? usuarios.tipo:'';
        setUsuario(tipo)


        const profile= await axiosClient.get(`/buscar/${id_user}`)
        //itera sobre el array que da la api ya que el id del user es un objeto almacenado en localstorage por lo cual devolvera un array y no un arreglo 
        for (const item of profile.data) {
       
            setprofileUser(item)
        }

    } catch (error) {
        console.log(error)
    }
}
    useEffect(() => {
        listar_profile()
            listAdoptedPets();
    },[]);

    const listAdoptedPets = async () => {
        try {
            const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
            const id= usuarios? usuarios.id:'';
            const listar = await axiosClient.get(`/solicitudes_aceptadas/${id}`);
            setPets(listar.data);
        
        } catch (error) {
            console.log(error);
        }
    };

  
   
    return (
        <>
        <Header />
        <Sidebar />
           
           
            {usuario === "SuperUsuario" && (
                <>
                 <button onClick={Open} className="relative top-24">  <FontAwesomeIcon icon={faPlus}/> crear Usuario</button>
                 <div className="grid  grid-cols-2 rounded-xl shadow-2xl absolute top-[36%] ml-[13%] border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] w-[64%]">
                    <div>
                    <h1 className="flex justify-center size-16 font-extrabold w-[100%]">Perfil de Usuario</h1>
                    <p className="flex justify-center text-center pb-6 pt-6">Nombre: {profile.nombre}</p>
                    <p className="flex justify-center pb-6 text-center">Celular: {profile.telefono}</p>
                    <p className="flex justify-center pb-6">Correo {profile.email}</p>
                    <p className="flex justify-center pb-6">Tipo de Usuaro: {profile.tipo}</p>
                    <p className="flex justify-center pb-6">Tipo de Documento: {profile.tipo_de_documento}</p>
                    <p className="flex justify-center pb-6">No° de  Documento: {profile.documento}</p>
                    <p className="flex justify-center pb-6">Direccion: {profile.direccion}</p>
                    <div className="bg-[#1999a6] w-[45%] relative left-[78%]">
                        <button onClick={updateProfile}>Editar Perfil</button>
                        {/*se  mana al modal mandando los datos del user */}
                        {update && <Editarperfil closeModal={closeupdate} profile={profile} />}
                    </div>
                    </div>
                
                    <div>
                        <img src={`${baseUrl}/img/${profile.foto}`} className="w-[40%] h-[80%] ml-[15%] first:rounded-xl mt-[7%]" />
                    </div>
                
                </div>
             
                   {open &&(< Create_User onclose={close}/>)}
                </>
            )}



            {usuario === "Administrador" && (
                <>
                <div className="grid  grid-cols-2 rounded-xl shadow-2xl absolute top-[36%] ml-[13%] border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] w-[64%]">
                        <div>
                        <h1 className="flex justify-start size-16 font-extrabold w-[100%] ml-7 mt-5">Perfil de Usuario</h1>
                        <p className="flex justify-start pb-6 ml-6">Nombre: {profile.nombre}</p>
                        <p className="flex justify-start pb-6 ml-7">Tipo: {profile.tipo}</p>
                        <p className="flex justify-start pb-6 ml-6">Correo: {profile.email}</p>
                        <button onClick={updateProfile}>Editar Perfil</button>

                        {update && <Editarperfil closeModal={closeupdate} profile={profile} />}
                        </div>
                        <div>
                        <img src={`${baseUrl}/img/${profile.foto}`} className="w-[40%] h-[80%] ml-[15%] first:rounded-xl mt-[7%]" />
                        </div>
                        </div>

                    {pets.length > 0 ?(
                    <div className="grid grid-cols-1 md:grid-cols-3  h-[32%]   w-[80%] absolute left-[10%] top-[95%]  mb-14 gap-5">
                    <h1 className="col-span-full  font-bold text-4xl   h-full">Adopciones Realizadas</h1>
                        {pets.map((pet) => (
                            <div key={pet.id} className="h-[54%] w-[53%] top-[35%] border-t-[#1999a6]  rounded-xl grid-rows-2 border-b border-b-[#1999a6] border-l border-l-[#1999a6] border-r border-r-[#1999a6] ">
                                <div className="w-full h-[70%]">
                                    <img src={`${baseUrl}/img/${pet.foto}`} className="h-full w-full rounded-lg"/>
                                </div>
                                <div className="p-4  relative bottom-0">
                                    <h1 className="font-bold">Nombre Mascota: {pet.nombre_mascota}</h1>
                                    <p className="text-sm">Edad: {pet.edad} años</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    ):(
                        <>
                        <div className="absolute top-[96%] left-[33%] "> 
                        <h1 className="text-3xl flex justify-center">No Has  Realizado Adopciones</h1>
                        </div>
                        </>

                    )}
                </>
            )}

            {usuario === "Usuario" && (
                    <>
                    <div className="grid  grid-cols-2 rounded-xl shadow-2xl absolute top-[36%] ml-[13%] border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] w-[64%]">
                            <div>
                            <h1 className="flex justify-start size-16 font-extrabold w-[100%] ml-7 mt-5">Perfil de Usuario</h1>
                            <p className="flex justify-start pb-6 ml-6">Nombre: {profile.nombre}</p>
                            <p className="flex justify-start pb-6 ml-7">Tipo: {profile.tipo}</p>
                            <p className="flex justify-start pb-6 ml-6">Correo: {profile.email}</p>
                            <button onClick={updateProfile}>Editar Perfil</button>

                            {update && <Editarperfil closeModal={closeupdate} profile={profile} />}
                            </div>
                            <div>
                            <img src={`${baseUrl}/img/${profile.foto}`} className="w-[40%] h-[80%] ml-[15%] first:rounded-xl mt-[7%]" />
                            </div>
                            </div>
                            {pets.length > 0 ?(
                            <div className="grid grid-cols-1 md:grid-cols-3  h-[32%]   w-[80%] absolute left-[10%] top-[95%]  mb-14 gap-5">
                            <h1 className="col-span-full  font-bold text-4xl   h-full">Adopciones Realizadas</h1>
                                {pets.map((pet) => (
                                    <div key={pet.id} className="h-[84%] w-[53%] top-[35%] border-t-[#1999a6]  rounded-xl grid-rows-2 border-b border-b-[#1999a6] border-l border-l-[#1999a6] border-r border-r-[#1999a6] ">
                                        <div className="w-full h-[70%]">
                                            <img src={`${baseUrl}/img/${pet.foto}`} className="h-full w-full rounded-lg"/>
                                        </div>
                                        <div className="p-4  relative bottom-0">
                                            <h1> <strong>Nombre Mascota: </strong> {pet.nombre_mascota}</h1>
                                            <p className="text-sm"><strong>Edad: </strong> {pet.edad} años</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            ):(
                                <>
                                <div className="absolute top-[96%] left-[33%] "> 
                                <h1 className="text-3xl flex justify-center">No Has  Realizado Adopciones</h1>
                                </div>
                                </>
                            )}
                 
                    </>
             )}
        </>
    );
};

export default Perfil;