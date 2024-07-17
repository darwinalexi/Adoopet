import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from"sweetalert2"
import axiosClient from "../utils/axiosClent";

function Login() {
  const backgroundImageStyle = {
    backgroundImage: "url('./src/img/bg-login.svg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: '100vh'
  };

  const navigate = useNavigate(); 

  const [usuarios, setusuarios] = useState({
    correo: '',
    contrasena: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [token, setToken] = useState('');

  const login = async (event) => {
    event.preventDefault();
    try {
      const consulta = await axiosClient.post(`/login`, usuarios);
      if (consulta.status === 200) {
        Swal.fire({
          
          icon: "success",
          title: "Ingreso exiosamente a nuestro sistema;",
          showConfirmButton: true,
          timer: 1500
        })
        setMensaje(consulta.data.mensaje);
        setToken(consulta.data.token);
        localStorage.setItem('token', consulta.data.token);
        localStorage.setItem('usuario', JSON.stringify(consulta.data.mensaje));
        navigate('/mascotap'); 
      } 
      if (consulta.status===404) {
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
    }
  };

  const handinputchange = (event) => {
    const { name, value } = event.target;
    setusuarios((prevUsuarios) => {
      const updatedUsuarios = {
      ...prevUsuarios,
        [name]: value
      };
      console.log('Updated usuarios:', updatedUsuarios);
      return updatedUsuarios;
    });
  }

  return (
    <div className="w-full h-screem rounded-xl relative left-0 sm:w-2/4 sm:left-52 sm:ml-14 sm:h-screen " style={backgroundImageStyle}>
      <div className="p-5 absolute top-40 w-full">
        <form onSubmit={login} className="pr-12 absolute top-40 w-full">
          <h1 className="text-4xl font-bold text-white">Iniciar Sesion</h1>
          <br />
          <input type="email" name="correo" placeholder="Ingresa Tu Usuario" onChange={handinputchange} className="w-full h-full rounded-full bg-custom-gray opacity-50 p-4 placeholder:text-slate-400 focus:outline-none"/>
          <br />
          <br />
          <input
            type="password"
            name="contrasena"
            placeholder="Ingrese La Clave"
            className="w-full h-full rounded-full opacity-50 placeholder:text-slate-400 focus:outline-none p-4 bg-custom-gray"
            onChange={handinputchange}
          />
          <br />
          <input type="submit" className="bg-sky-800 p-4 w-full m-2 rounded-full" value="Ingresar" />
          
        </form>
      </div>
    </div>
  );
}

export default Login;
