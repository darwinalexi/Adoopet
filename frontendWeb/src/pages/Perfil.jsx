import { useState } from "react";
import Header from "./Component/Header";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Menu } from "./Component/Menu";



const Perfil =()=>{
    const [user, setuser]= useState({
        nombre:'',
        email:'',
        password:'',
        tipo:''
    })
    const [createpet, setcreate]= useState(false);
    const[crear, setcrear]= useState(null)

    const opencreate = (pet)=>{
        setcrear(pet)
        setcreate(true)
       
      }
      
      const close_modal=()=>{
      setcreate(false)
      }

    
function createheader(token){
    return {
        headers:{
            'token':token
        }
    };
  }
    const registrar_user=async(e)=>{
        try {
            e.preventDefault();
            const token= localStorage.getItem('token')
            const header= createheader(token)
            const crear= await axios.post("http://localhost:4001/crear",user, header)
            setuser(crear)
            console.log(crear)
        } catch (error) {
            console.log(error)
        }
    }

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
            <Menu/>
            
            <div className="bg-slate-200 w-[45%] absolute left-[50%]  top-24 rounded-3xl -z-20">
                <h1>Crear Usuario</h1>
                <form  onSubmit={registrar_user} onChange={handinputchange}>
                    
                        <div className="w-[50%] relative left-[24%] ">
                        <label>Ingrese el nombre</label>
                        <br />
                        <FontAwesomeIcon icon={faUser} color="orange" className="relative top-9 left-[-42%]  size-6"/>
                        <input type="text" name="nombre" onChange={handinputchange}  placeholder="Ingrese el nombre" className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                        </div>
                    <br />
                    <div  className="w-[50%] relative left-[24%]">
                    <label>Ingrese el correo</label>
                    <br />
                    <FontAwesomeIcon icon={faEnvelope} color="orange" className="relative top-9 left-[-42%]  size-6"/>
                    <input type="email" name="email"  onChange={handinputchange}   placeholder="Ingrese  el correo"className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                    </div>
                    <br />
                    <div className="w-[50%] relative left-[24%]">
                    <label>Ingrese Clave</label>
                    <br />
                    <FontAwesomeIcon icon={faLock} color="orange" className="relative top-9 left-[-42%]  size-6" />
                    <input type="password" name="password"  onChange={handinputchange}  placeholder="Ingrese la contraseña" className="w-[100%] h-11  text-center rounded-lg focus-within:"/>
                    </div>
                    
                    <br />
                    <label>seleccione su rol</label>
                  <br />
                    <select name="tipo" id=""  onChange={handinputchange}  className="w-[50%] h-11  border-orange-600 border-x-2 border-y-2  text-center rounded-lg focus-within:invalid">
                    <option hidden>seleccione...</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                    <br />
                    <input type="submit"  value="Registrar"  className=" border-orange-600 border-x-2 border-y-2 mt-7 w-[50%] h-11  text-center rounded-lg focus-within:invalid:"/>
                </form>
                
            </div>
        </>
    

    )
}
export default Perfil;