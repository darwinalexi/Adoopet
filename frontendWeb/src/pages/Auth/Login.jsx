
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from"sweetalert2"
import axiosClient from "../utils/axiosClent";

function Login() {


  const navigate = useNavigate(); 

  const [usuarios, setusuarios] = useState({
    correo: '',
    contrasena: ''
  });
  const [user, setUsuario]= useState([])

  const [mensaje, setMensaje] = useState('');
  const [token, setToken] = useState('');

  const validarEmail = (email) => {
    // Expresión regular básica para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

  const login = async (event) => {
    event.preventDefault();
    if (!usuarios.correo || !usuarios.contrasena) {
      Swal.fire({
        icon: "error",
        text: "Llena los datos para poder loguearte",
        showConfirmButton: false,
        timer: 1500
    });
    return ;
    }
const correo= usuarios.correo;
    if (  !validarEmail(correo)) {
      
    }
    try {
      const consulta = await axiosClient.post(`/login`, usuarios);
      if (consulta.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Ingresó exitosamente a nuestro sistema;",
          showConfirmButton: true,
          timer: 1500
        })

        setMensaje(consulta.data.mensaje);
        setToken(consulta.data.token);
        localStorage.setItem('token', consulta.data.token);
        
        localStorage.setItem('usuario', JSON.stringify(consulta.data.mensaje));
        const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
        const tipo = usuarios ? usuarios.tipo : '';
        if (tipo=="Invitado") {
          Swal.fire({
            icon: "error",
            title: "No posee permisos para ingresar al sistema",
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          navigate('/mascotap'); 
        }
        
      } 
      if (consulta.status==404) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Credenciales incorrectas",
          showConfirmButton: false,
          timer: 1500
        })
        setMensaje(consulta.data.mensaje);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un problema al iniciar sesión",
        text: "Credenciales Incorrectas",
      });
    }
  };


  const modeinvite =async () => {
    try {
      const data={
        correo:"invitado@gmail.com",
        contrasena:"123456789"
      }
      const consulta = await axiosClient.post(`/login`, data);
    if (consulta.status==200) {
      Swal.fire({
        icon: "success",
        title: "Ingreso exitoso",
       showConfirmButton: false,
      });
      localStorage.setItem('token', consulta.data.token)
      localStorage.setItem('usuario', JSON.stringify(consulta.data.mensaje))
      navigate('/mascotas_por_adoptar')
    }
  
    } catch (error) {
      console.log(error)
    }
  }


  const handinputchange = (event) => {
    const { name, value } = event.target;
    setusuarios((prevUsuarios) => {
      const updatedUsuarios = {
      ...prevUsuarios,
        [name]: value
      };

      return updatedUsuarios;
    });
  }

  return (
    <div className="w-[100%] grid grid-cols-2 h-[37%]  border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] h-screen overflow-hidden rounded-xl shadow-2xl" >
            <div className="w-[100%]">
            <img src="./src/img/login.JPG" className="w-[100%] h-[100%]" />
            </div>
            <div >
              <div className="relative top-[30%] left-4">
                <div className="relative bottom-[64%]">
                <form onSubmit={login} className="pr-12 w-full ">
                      <h1 className="text-4xl font-bold text-[#1999a6] mb-6">Iniciar Sesion</h1>
                      <br />
                      <input type="email" name="correo" placeholder="Ingresa Tu Usuario" onChange={handinputchange} className="border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6] w-full h-full rounded-full bg-custom-gray opacity-50 p-4 placeholder:text-slate-400 focus:outline-none"/>
                      <br />
                      <br />
                      <input
                        type="password"
                        name="contrasena"
                        placeholder="Ingrese La Clave"
                        className="w-full h-full rounded-full opacity-50 placeholder:text-slate-400 focus:outline-none p-4 bg-custom-gray border-t border-t-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] border-l border-l-[#1999a6]"
                        onChange={handinputchange}
                      />
                      <br />
                      <input type="submit" className="bg-sky-800 p-4 w-full m-2 rounded-full text-white" value="Ingresar" />
                      <br />
                      <button onClick={modeinvite} 
                      className="border-b border-b-sky-800 border-t border-t-sky-800  border-r border-r-sky-800 border-l border-l-sky-800 p-4 w-full m-2 rounded-full text-sky-800"
                      >Ingresar como Invitado
                      </button>
                      

                    </form>
                </div>
                    
              </div>
            </div>
    </div>
  );
}

export default Login;
