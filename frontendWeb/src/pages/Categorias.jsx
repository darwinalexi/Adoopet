import { useEffect, useState } from "react"
import DataaTable  from"react-data-table-component"
import axiosClient from "./utils/axiosClent";
import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";

const Categorias =()=>{
    const [categorias, setcategoria]= useState([]);


    const listar_categorias=async()=>{
        const listar= await axiosClient.get("/listar_categories")
        setcategoria(listar.data)
        console.log("listar", listar.data) 
    }

    useEffect(()=>{
        listar_categorias();
    },[])


    const columns=[
        {
        name:"Id",
        selector: space=>space.id
        },
        
        {
            name:"Nombre",
            selector: space=>space.nombre
            ,
        },
        {
            name:"Accion"
        }
    ]
    
    return(
        <>
        <Header/>
        <Sidebar/>
            |<DataaTable className="pt-28"
            columns={columns}
            data={categorias}
            pagination
            paginationPerPage={4}
            paginationRowsPerPageOptions={[1,2,3]}
            />
        </>
    )
}

export default Categorias