import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosClient from "./utils/axiosClent";
import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Create_catregories from "./Component/Modal/createcategoria";
import Editcategories from "./Component/Modal/editcategoria";

const Categorias = () => {
    const [categorias, setCategoria] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [openmodal, setmodal] = useState(false);
    const [update, setupdate] = useState(false);
    const [register, setregister] = useState({
        nombre: '',
        estado: ''
    });
    const [categoriaActual, setCategoriaActual] = useState(null);

    const open = () => {
        setmodal(true);
        console.log("Modal abierto");
    };

    const close = () => {
        setmodal(false);
        console.log("Modal cerrado");
    };

    const openupdate = (categoria) => {
        setCategoriaActual(categoria); // Guarda la categoría seleccionada para editar
    
        setupdate(true); // Abre el modal de edición
    };

    const closeupdate = () => {
        setupdate(false);
        setCategoriaActual(null); // Limpia la categoría actual
    };

    
    const listar_categorias = async () => {
        try {
            const response = await axiosClient.get("/listar_categories");
            setCategoria(response.data);
            console.log("listar", response.data);
        } catch (error) {
            console.log("Error al listar categorías:", error.response);
        }
    };

    useEffect(() => {
        listar_categorias();
    }, []);

    // Filtrador 
    const filteredCategorias = categorias.filter(categoria => {
        const nombre = categoria.nombre ? categoria.nombre.toLowerCase() : '';
        return nombre.includes(searchTerm.toLowerCase()) &&
               (selectedState ? categoria.estado === selectedState : true);
    });
    

    const conditionalRowStyles = [
        {
            when: row => row.estado === "Activo",
            style: {
                color: '#155724',
            },
        },
        {
            when: row => row.estado === "Desactivo",
            style: {
                color: 'red',
            },
        },
    ];



   

    const eliminar_categoria = async (id) => {
        try {
            const borrar = await axiosClient.delete(`/eliminar_categories/${id}`);
            setCategoria(borrar.data.mensaje);
            Swal.fire({
                icon: "success",
                title: "Categoría eliminada",
                text: borrar.data.mensaje,
                showConfirmButton: true,
                timer: 3500
            });
            window.location.reload();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Lo sentimos",
                text: "La categoría no ha poidido ser eliminada exitosamente",
                showConfirmButton: true,
                timer: 3500
            });
        }
    };

    const columns = [
        {
            name: "Id",
            selector: row => row.id,
        },
        {
            name: "Nombre",
            selector: row => row.nombre,
        },
        {
            name: "Estado",
            selector: row => row.estado,
        },
        {
            name: "Acción",
            cell: row => (
                <div className="flex space-x-2">
                    <button onClick={() => eliminar_categoria(row.id)}>
                        <FontAwesomeIcon icon={faTrash} color="red" className="size-5" />
                    </button>
                    <button onClick={() => openupdate(row)}>
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
            <div className="relative top-32">
                <div className="relative right-[40%] top-8">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="p-2 border-b border-b-[#1999a6] focus:outline-0"
                    />
                </div>
                <div className="absolute top-[14%] left-[46%]">
                    <button onClick={open}><FontAwesomeIcon icon={faPlus} className="bg-[#1999a6] rounded-lg p-2 text-white"/> Crear Categoria</button>
                </div>
                <div className="relative left-[90%] mb-4 w-[12%]">
                    <select
                        value={selectedState}
                        onChange={e => setSelectedState(e.target.value)}
                        className="p-2 border-b border-b-[#1999a6] border-t border-t-[#1999a6] border-l border-l-[#1999a6] border-r border-r-[#1999a6] focus:outline-0">
                        <option value="">Todos</option>
                        <option value="Activo">Activo</option>
                        <option value="Desactivo">Desactivo</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
                    {filteredCategorias.length >0?(
                        <DataTable
                        className="pt-14"
                        columns={columns}
                        data={filteredCategorias}
                        pagination
                        paginationPerPage={4}
                        paginationRowsPerPageOptions={[1, 2, 3]}
                        conditionalRowStyles={conditionalRowStyles}
                    />
                    ):(
                        <p className="text-center">No Hay Registros</p>
                    )}
                
                </div>
             
            </div>
            {openmodal && (<Create_catregories onclose={close} /> )}
            {update && (<Editcategories data={categoriaActual} onclose={closeupdate}  />)}
               
        
        </>
    );
};

export default Categorias;
