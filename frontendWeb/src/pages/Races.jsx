import { useEffect, useState } from "react";
import axiosClient from "./utils/axiosClent";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClose, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";
import EditRaces from "./Component/Modal/Editarraces";

const Razas=()=>{
    const [races, setraces]=useState([]);
    const [moodal, setmodal]= useState(false);
    const [selectedRace, setSelectedRace] = useState(null);
    const [update, setupdate] = useState(false)
    const [datos, setdatos]=useState({
        nombre_r:''
    })
    const [searchTerm, setSearchTerm] = useState("");


    const updateopen =(races)=>{
        setSelectedRace(races)
     setupdate(true)
    }
    const closeopen =()=>{
        setupdate(false)
       }
    const open =()=>{
        setmodal(true)
    }
    const close =()=>{
        setmodal(false)
    }    

    const handinputchange = (event) => {
        const { name, value } = event.target;
        setdatos((prevUsuarios) => {
          const updatedUsuarios = {
          ...prevUsuarios,
            [name]: value
          };
         
          return updatedUsuarios;
        });
      }
    



const column=[
    {
        name:'ID',
        selector:row =>row.id
    },
    {
        name:'Nombre',
        selector:row =>row.nombre_r
    },
    {
        name: "Acción",
        cell: row => (
            <div className="flex space-x-2">
                <button onClick={() => eliminar_raza(row.id)}>
                    <FontAwesomeIcon icon={faTrash} color="red" className="size-5" />
                </button>
                <button onClick={() => updateopen(row)}>
                <FontAwesomeIcon icon={faEdit} color="#1999a6" className="size-5" />
                </button>
                
            </div>
        )
    },
]

const crear_race= async(e)=>{
e.preventDefault();
    if (!datos.nombre_r ) {
        Swal.fire({
            icon: "succes",
            text:"Llene los campos",
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }
    if (!datos.nombre_r.trim() || !/^[a-zA-Z\s]*$/.test(datos.nombre_r)) {
        Swal.fire({
          icon: "error",
          text: "El nombre debe ser un texto",
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }
    try {
        const crear= await axiosClient.post("/crear_races",datos)
        if (crear.status==200) {
            Swal.fire({
                icon: "success",
                title: crear.data.mensaje,
                showConfirmButton: false,
                timer: 1500
              })
        }
        window.location.reload();
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: error,
            showConfirmButton: false,
            timer: 1500
          })
    }
}
const eliminar_raza=async(id)=>{
    try {
        const borrar=await axiosClient.delete(`eliminar_races/${id}`)
       
        if (borrar.status==200) {
            Swal.fire({
                icon: "success",
                title: borrar.data.mensaje,
                showConfirmButton: false,
                timer: 1500
              })
        }

        window.location.reload();
        
    } catch (error) {
        Swal.fire({
            icon: "error",
            title:"No se puede  Eliminar ya que esta raza la posee una mascota",
            showConfirmButton: false,
            timer: 3000
          })
    }
}
    const listar_races= async()=>{
        try {
            const listar= await axiosClient.get("/listar_races")
            setraces(listar.data)
            console.log("razas",listar.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
listar_races();
    },[])
    
    const razas= races.filter(raza=>{
        const nombre= raza.nombre_r ? raza.nombre_r.toLowerCase() : '';
        return nombre.includes(searchTerm.toLowerCase())
      })
return(
    <>
   <Header className="-z-30" />
    <Sidebar/>
    <div className="relative right-[40%] top-28">
  <input
    type="text"
    placeholder="Buscar..."
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    className="p-2 border-b border-b-[#1999a6] focus:outline-0"
  />
</div>
   <div     className="absolute top-[26%] w-[89%]">
   <h1>Razas</h1>
    <button onClick={open} className="bg-[#1999a6] rounded-lg p-2 text-white">Crear Raza</button>
    
    <div className="pt-10 overflow-x-auto">
        {razas.length>0?(
            <DataTable
            columns={column}
            data={razas}
            />
        ):(
            <p>No Hay Razas Registradas</p>
        )}      
    </div>
    

   </div>

    {moodal &&(
          <>
             <div className="bg-[#707070]  h-full fixed left-0 top-0 w-full bg-opacity-50 z-50">
            <div className=" bg-white h-[45%] w-[50%] relative top-[34%] left-[24%] rounded-lg  z-20 p-6 shadow-lg">
                <button  onClick={close}> <FontAwesomeIcon icon={faClose}/></button>
                <h1 className="text-black  text-3xl">Crear  Raza</h1>
                <form onSubmit={crear_race}>
                    <label>Ingrese  el nombre de la Raza</label>
                    <br />
                    <input 
                        type="text" 
                        name="nombre_r" 
                        placeholder="Ingres el Nombre de la Raza a crear" 
                        className=" p-4 w-[80%] m-2 rounded-full  border-t border-t-[#1999a6] rounded-xl border-b border-b-[#1999a6] border-l border-l border-l-[#1999a6] border-r border-r-[#1999a6]"
                        onChange={handinputchange}
                     />
                     <input type="submit" name=""  className=" p-4 w-[80%] m-2 rounded-full text-white bg-[#1999a6]" />
                </form>
            </div>
          </div>
        
          </>
    )}
     {update && selectedRace && (
                <EditRaces close={closeopen} data={selectedRace} />
            )}
    </>
)

}
export default Razas;