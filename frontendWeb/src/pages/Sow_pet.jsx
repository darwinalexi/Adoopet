import  { useEffect, useState } from "react";
import Header from "./Component/Header";
import axiosClient from "./utils/axiosClent";
import { Sidebar } from "../pages/Component/Siderbar/siderbar";
import { ResponsiveContainer, BarChart, XAxis, CartesianGrid, YAxis, Tooltip, Legend, Bar } from "recharts";

const Sow_pet = () => {
  const [user, setUser] = useState([]);
  const [userty, setUsertype] = useState('');
  const [usuariosContados, setUsuariosContados] = useState(null);
  const [pet, setPetCount] = useState([]);
  const [adopciones, setadopciones]=useState([])



  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
    const tipo = usuarios ? usuarios.tipo : '';
    setUsertype(tipo)

  }, []);

  useEffect(() => {
    async function obtenerYGuardarUsuarios() {
      try {
        const respuesta = await axiosClient.get("http://localhost:4001/contar_usuarios");
        localStorage.setItem('usuarios_contados', JSON.stringify(respuesta.data));
        const usuariosContados = JSON.parse(localStorage.getItem('usuarios_contados'));
        setUsuariosContados(usuariosContados);
      } catch (error) {
        console.error("Error obteniendo usuarios:", error);
      }
    }
    obtenerYGuardarUsuarios();
  }, []);

  useEffect(() => {
    async function obtenerMascotas() {
      try {
        const respuesta = await axiosClient.get("http://localhost:4001/contar_mascotas");
        localStorage.setItem('mascotas_contados', JSON.stringify(respuesta.data));
        const mascotasContadas = JSON.parse(localStorage.getItem('mascotas_contados'));
        setPetCount(mascotasContadas);
      } catch (error) {
        console.error("Error obteniendo mascotas:", error);
      }
    }
    obtenerMascotas();
  }, []);

  useEffect(() => {
    async function obteneradpociones() {
      try {
        const respuesta = await axiosClient.get("http://localhost:4001/contar_adopciones");
        localStorage.setItem('adopciones_contados', JSON.stringify(respuesta.data));
        const adopciones = JSON.parse(localStorage.getItem('adopciones_contados'));
        setadopciones(adopciones);
      } catch (error) {
        console.error("Error obteniendo adopciones", error);
      }
    }
    obteneradpociones();
  }, []);

  

  const combinedData = [
    { name: "Usuarios", total: usuariosContados ? usuariosContados.total : 0 },
    { name: "Mascotas", total: pet ? pet.total : 0 },
    { name: "Adopciones", total: adopciones ? adopciones.total:0}
  ];

  return (
    <>
      <Header />
      <Sidebar  />
      {userty === "Usuario" && (
        <>
        <div className="absolute left-0 top-0  w-[100%] h-full overflow-hidden ">
          <img src="./src/img/compartir _GIFs.gif" className="w-full h-full opacity-40" />
            <div className=" -z-30 absolute z-50 left-[14%] top-[17%] h-[55%] w-[70%] rounded-xl">
            <div className="absolute  left-[14%] top-[28%] w-[90%] z-50">
              <h1 className="text-5xl font-bold">ADOPPET</h1>
              <p className=" text-4xl w-[95%]">En Adoppet, creemos que cada mascota merece un hogar lleno de amor y cuidado. Únete a nuestra comunidad y encuentra a tu compañero perfecto entre cientos de 
                animales esperando por una oportunidad de ser parte de tu familia. Al adoptar, no solo cambias la vida de un ser querido, 
                sino que también abres espacio para que más animales encuentren un hogar. Da el primer paso hacia una amistad duradera, llena de alegría y lealtad. Descubre hoy mismo el 
                increíble impacto que puedes tener al elegir adoptar a través de Adoppet y transforma vidas, comenzando con la tuya."</p>
            </div>
            </div>
        </div>
        
        </>
      )}

      {userty === "Administrador" && (
        <>
          <div className="grid grid-cols-3 w-[80%] h-[13%] absolute left-[12%] top-[24%]">
              <div className="rounded-xl w-[75%]   h-[100%] border-t-[#1999a6] border-l border-l-[#1999a6] border-t border-r-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6]">
                <h1  className="flex justify-start mt-5 ml-5 font-bold">Usuarios Registrados En ADOPPET</h1>
                <p className="flex justify-center mt-7 text-xl">{usuariosContados ? usuariosContados.total : 'Cargando...'}</p>
              </div>
              <div className="rounded-xl w-[70%]   border-t-[#1999a6] border-l border-l-[#1999a6] border-t border-r-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] ">
                <h1 className="flex justify-start mt-5 ml-5 font-bold">Mascotas Registrados En ADOPPET</h1>
                <p className="flex justify-center mt-7 text-xl">{pet ? pet.total : 'Cargando...'}</p>
              </div>
              <div className="rounded-xl w-[70%]  border-t-[#1999a6] border-l border-l-[#1999a6] border-t border-r-[#1999a6] border-b border-b-[#1999a6] border-r border-r-[#1999a6] ">
                <h1 className="flex justify-start mt-5 ml-5 font-bold">Adopciones Pendientes  En ADOPPET</h1>
                <p className="flex justify-center mt-7 text-xl">{adopciones ? adopciones.total : 'Cargando...'}</p>
              </div>
          </div>
          
          <div className="w-[90%] mx-auto mt-[45%]"> {/* Ajusta la posición del gráfico */}
            <h1 className=" text-3xl font-bold">Grafica De Datos</h1>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#1999a6" barSize={80} />
              </BarChart>
            </ResponsiveContainer>
          </div>
       
       
        </>
      )}
    </>
  );
};

export default Sow_pet;