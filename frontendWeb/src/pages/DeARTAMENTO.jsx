import { useEffect, useState } from "react"
import axiosClient from "./utils/axiosClent"
import DataTable from "react-data-table-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import EditDepart from "./Component/Modal/editdepart"
import Create_depart from "./Component/Modal/DepartamentopModal"
import Header from "./Component/Header"
import { Sidebar } from "./Component/Siderbar/siderbar"
function Departamento() {
    
    const [depart, setdepart]= useState([])
    const [openupdate, setupdate]= useState(false);
    const [select, setselect]= useState([])
    const [create, setcreate]=useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    
    const open= (depart)=>{
      setselect(depart);
        setupdate(true)
    }

    const close= ()=>{
        setselect(null);
          setupdate(false)
      }
    

      const opencreae= ()=>{
          setcreate(true)
      }
  
      const closecreate= ()=>{
            setcreate(false)
        }
    const listar= async()=>{
        try {
            const listar= await axiosClient.get("/departamento")
            setdepart(listar.data)
        } catch (error) {
            console.log(error)
        }
    }
    const  eliminar= async(id)=>{
        try {
            const  eliminar= await axiosClient.delete(`/departamento/${id}`)
            setdepart(eliminar.data.mensaje)
            Swal.fire({
                text: 'Departamento eliminado con éxito',
                showConfirmButton: false,
                timer: 1500
              });
              window.location.reload();
        } catch (error) {
            Swal.fire({
                text: 'No fue posible  eliminar el departamento',
                showConfirmButton: false,
                timer: 1500
              });
              console.log(response.data.mensaje);
              window.location.reload();
        }
    }

    const depar= depart.filter(departamento=>{
        const nombre= departamento.nombre ? departamento.nombre.toLowerCase() : '';
        return nombre.includes(searchTerm.toLowerCase())
      })
    const column= [
        {
            name:'Id',
            selector: row => row.id,
        },
        {
            name:'Nombre',
            selector: row => row.nombre,
        },
        {
            name:'Codigo Dane',
            selector: row => row.codigo_dane,
        },
        {
            name: "Acción",
            cell: row => (
                <div className="flex space-x-2">
                    <button onClick={() => eliminar(row.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} color="red" className="size-5" />
                    </button>
                    <button  onClick={() => open(row)}>
                        <FontAwesomeIcon icon={faEdit} color="#1999a6" className="size-5" />
                    </button>
                </div>
            )
        },
    ]

    useEffect(()=>{
        listar()
    })
    return(
        <>
<Header/>
<Sidebar/>
        <div className="grid  grid-rows-2 h-full gap-0 ml-[10%]">
        <div className="relative right-[40%] top-28  ">
        <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 border-b border-b-[#1999a6] focus:outline-0"
        />
        </div>

        <div className=" absolute top-[40%] w-[78%]">
            <h1>Departamento</h1>
            <button className="bg-[#1999a6] rounded-lg p-2 text-white" onClick={opencreae}>Crear Departamento</button>
            <div className="overflow-x-auto">
            {depar.length>0?(
                <DataTable
                columns={column}
                data={depar}
                pagination
                paginationPerPage={4}
                paginationRowsPerPageOptions={[1, 2, 3]}
                />
            ):(
                <p>No Hay Departamento</p>
            )}
            
            </div>
           
            {create &&(<Create_depart onclose={closecreate} />)}
            {openupdate &&(<EditDepart data={select} onclose={close} />)}
        </div>
        </div>
      
        </>
    )
}

export default Departamento;