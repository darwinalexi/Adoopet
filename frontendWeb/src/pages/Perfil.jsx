import { useState, useEffect } from "react";
import Header from "./Component/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Sidebar } from "./Component/Siderbar/siderbar";
import axiosClient from "./utils/axiosClent";





const Perfil =()=>{
    const [usuario, setTipo] = useState([]);
    const [username, setname]= useState('');
    const [email,setemail]=useState('')
    const [id, setiduser]=useState([])
    const [pet, setpet]= useState([]);


 
    useEffect(() => {
      const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
      if (usuarios.length > 0) {
        const usuario = usuarios[0];
        setTipo(usuario.tipo || 'Invitado');
        setname(usuario.nombre);
        setemail(usuario.email)
        setiduser(usuario.id)
      }
    }, []);



    const [user, setuser]= useState({
        nombre:'',
        email:'',
        password:'',
        tipo:''
    })
    const [createpet, setcreate]= useState(false);
    const[crear, setcrear]= useState(null)


    const registrar_user=async(e)=>{
        try {
            e.preventDefault();
            const crear= await axiosClient.post("/crear",user)
            setuser(crear)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if (id) {
            lisar_adoptadas();
        }
            },[id])
            const lisar_adoptadas = async () => {
                try {
                    if (!id) {
                        throw new Error("ID no está definido o es vacío");
                    }
                    const url = `/listas_pets_adop/${id}`;
                    console.log("Haciendo solicitud a:", url);
                    const listar = await axiosClient.get(url);
                    if (listar.status === 200) {
                        setpet(listar.data);
                        console.log("Mascotas adoptadas:", listar.data);
                    } else if (listar.status === 204) {
                        console.log("No hay mascotas adoptadas.");
                        setpet([]); // Limpia los datos si no hay mascotas
                    }
                } catch (error) {
                    if (error.response) {
                        // La respuesta del servidor con error
                        console.log('Respuesta de error:', error.response.data); // Información del error
                        console.log('Código de estado:', error.response.status); // Código de estado HTTP
                        console.log('Encabezados:', error.response.headers); // Encabezados de la respuesta
                    } else if (error.request) {
                        // Error en la solicitud, sin respuesta del servidor
                        console.log('Petición realizada pero sin respuesta:', error.request);
                    } else {
                        // Error al configurar la solicitud
                        console.log('Error al configurar la petición:', error.message);
                    }
                }
            };
            
            
            

    
    const handinputchange = (event) => {
        const { name, value } = event.target;
        setuser((prevUsuarios) => {
          const updatedUsuarios = {
          ...prevUsuarios,
            [name]: value
          };
          console.log('Updated usuarios:', updatedUsuarios);
          return updatedUsuarios;
        });
      }
    return(
        <>
        
            <Header/>
            <Sidebar/>
            
            {usuario==="Administrador" &&(
                <>
                <div className="relative top-24 left-[17%]  w-[23%] -z-50">
                    <h1 className="flex justify-start size-16 font-extrabold w-[100%]" >Perfil de Usuario</h1>
                    <p className="flex justify-start pb-6">Nombre: {username}</p>
                    <p className="flex justify-start pb-6">Tipo:{usuario}</p>
                    <p className="flex justify-start pb-6">correo: {email}</p>
                    </div>

                    <div className="bg-slate-200 w-[45%] absolute left-[50%]  top-24 rounded-3xl -z-20">
                <h1>Crear Usuario</h1>
                <form  onSubmit={registrar_user} onChange={handinputchange}>
                        <div className="w-[50%] relative left-[24%] ">
                        <label>Ingrese el nombre</label>
                        <br />
                        <FontAwesomeIcon icon={faUser} color="#1999a6" className="relative top-9 left-[-42%]  size-6"/>
                        <input type="text" name="nombre" onChange={handinputchange}  placeholder="Ingrese el nombre" className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                        </div>
                    <br />
                    <div  className="w-[50%] relative left-[24%]">
                    <label>Ingrese el correo</label>
                    <br />
                    <FontAwesomeIcon icon={faEnvelope} color="#1999a6" className="relative top-9 left-[-42%]  size-6"/>
                    <input type="email" name="email"  onChange={handinputchange}   placeholder="Ingrese  el correo"className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                    </div>
                    <br />
                    <div className="w-[50%] relative left-[24%]">
                    <label>Ingrese Clave</label>
                    <br />
                    <FontAwesomeIcon icon={faLock} color="#1999a6" className="relative top-9 left-[-42%]  size-6" />
                    <input type="password" name="password"  onChange={handinputchange}  placeholder="Ingrese la contraseña" className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                    </div>
                    
                    <br />
                    <label>seleccione su rol</label>
                  <br />
                    <select name="tipo" id=""  onChange={handinputchange}  className="w-[50%] h-11    text-center rounded-lg focus-within:invalid">
                    <option hidden>seleccione...</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                    <br />
                    <input type="submit"  value="Registrar"  className="mt-7 w-[50%] h-11  text-center rounded-lg focus-within:invalid:"/>
                </form>
                
            </div>
                </>
            )}
                {usuario==="Usuario" &&(
                    <>
                    <div className="relative top-24 left-[17%]  w-[23%]  -z-50 ">
                    <h1 className="flex justify-start size-16 font-extrabold w-[100%]" >Perfil de Usuario</h1>
                    <p className="flex justify-start pb-6">Nombre: {username}</p>
                    <p className="flex justify-start pb-6">Tipo:{usuario}</p>
                    <p className="flex justify-start pb-6">correo: {email}</p>
                    </div>
                    <div className="bg-red-400  h-7 w-14 ">
                    {pet .map((adopciones)=>(
                        <>
                        <p>{adopciones.nombre_mas}</p>
                        </>
                        
                    ))}
                    </div>
                   

                    <div>

                    </div>
                </>
                )}

            
        </>
    

    )
}
export default Perfil;