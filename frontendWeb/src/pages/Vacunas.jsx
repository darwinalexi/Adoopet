import { useEffect, useState } from "react";
import axiosClient from "./utils/axiosClent";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";
import EditVacunas from "./Component/Modal/EditVacunas";
import CreateVacuna from "./Component/Modal/CreateVacuna";


function Vacunas() {
const [vacunas, setvacunas]= useState([]);
const [openupdate, setopenupdate]= useState(false)
const [vacuselect, setvacuselect]= useState()
const [create, setopencreate]= useState(false) 


const update=(vacuna)=>{
    setopenupdate(true)
    setvacuselect(vacuna)
}

const close=()=>{
    setopenupdate(false)
    setvacuselect(null)
}
const open=()=>{
    setopencreate(true)
}
const closecreate=()=>{
    setopencreate(false)
}

    const listar_vacunas= async()=>{
        try {
            const listar= await axiosClient.get("/vacunas")
            setvacunas(listar.data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        listar_vacunas();
    })

    const elimniar= async(id)=>{
        try {
            const elimniar =  await axiosClient.delete(`/vacunas/${id}`)
            console.log(elimniar.data.mensaje);
            Swal.fire({
                icon: "succes",
                text:elimniar.data.mensaje,
                showConfirmButton: false,
                timer: 1500
            })
            window.location.reload();
        } catch (error) {
            Swal.fire({
                icon: "error",
                text:"la vacuna esta en uso",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    const columns = [
        {
          name: 'Id',
          selector: row => row.id,
        },
        {
          name: 'Nombre',
          selector: row => row.nombre,
        },
        {
          name: "Acción",
          cell: row => (
            <div className="flex space-x-2">
              <button  onClick={()=>elimniar(row.id)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" className="size-5" />
              </button>
              <button   onClick={()=>update(row)}>
                <FontAwesomeIcon icon={faEdit} color="#1999a6" className="size-5" />
              </button>
            </div>
          )
        },
      ];


    
    return(
        <> 
         <Header/> 
         <Sidebar/> 
         <div>
           
         <DataTable
         columns={columns}
         data={vacunas}
         pagination
         paginationPerPage={4}
         paginationRowsPerPageOptions={[1, 2, 3]}
         className="mt-[13%]"
         />
          <button onClick={open}>Crear Vacuna</button>
    {openupdate &&( <EditVacunas  data={vacuselect} onclose={close}/> )}
    {create && ( <CreateVacuna onclose={closecreate}/>)}
        </div>
        </>
    )
}

export default Vacunas;