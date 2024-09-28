import { useEffect, useRef, useState } from "react";
import axiosClient from "./utils/axiosClent";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";
import Edituse from "./Component/Modal/Edituser";
import { baseUrl } from "./utils/data";

const Usuarios = () => {
    const [user, setUser] = useState([]);
    const [borrar, setBorrar] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [userselect, setuser]=useState([])

    const open=(user)=> {
    setOpenUpdate(true);
    setuser(user)
    }
    
    const close=()=> {
        setOpenUpdate(false);
        }
    const [searchTerm, setSearchTerm] = useState("");
    const borrarUsuario = async (id) => {
        try {
            const response = await axiosClient.delete(`/eliminar/${id}`);
            listarUser();
            
        } catch (error) {
            console.log(error);
        }
    };

    const listarUser = async () => {
        try {
            const response = await axiosClient.get("/listar_user");
            setUser(response.data);
         
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarUser();
    }, []);




    const users= user.filter(user => {
        const nombre = user.nombre ? user.nombre.toLowerCase() : '';
        return nombre.includes(searchTerm.toLowerCase());
    });
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        },
        {
            name: 'Foto',
            selector: row => row.foto,
            cell: row => (
                <img
                    src={`${baseUrl}/img/${row.foto}`}
                    alt="Foto de usuario"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                />
            ),
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
        },
        {
            name: 'Correo',
            selector: row => row.email,
        },
        {
            name: 'Rol',
            selector: row => row.tipo
        },
        {
            name: "Acción",
            cell: row => (
                <div className="flex space-x-2">
                    <button onClick={() => borrarUsuario(row.id)}>
                        <FontAwesomeIcon icon={faTrash} color="red" className="size-5" />
                    </button>
                    <button onClick={() => open(row)}>
                        <FontAwesomeIcon icon={faEdit} color="#1999a6" className="size-5" />
                    </button>
                </div>
            )
        },
    ];

    return (
        <>
            <Header />
            <Sidebar />
            <div className="relative right-[40%] top-28">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="p-2 border-b border-b-[#1999a6] focus:outline-0"
                    />
                </div>
            <div className="pt-40 overflow-x-auto">
                {users.length >0 ?(
                    <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    paginationPerPage={4}
                    paginationRowsPerPageOptions={[1, 2, 3]}
                    />
                ):(
                    <p className="text-center">No Hay Registros</p>
                )}
              
            </div>
            {openUpdate && (<Edituse data={userselect} onclose={close}/>)}
        </>
    );
};

export default Usuarios;
