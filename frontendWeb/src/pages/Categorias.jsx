import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosClient from "./utils/axiosClent";
import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

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
        setregister({
            nombre: categoria.nombre,
            estado: categoria.estado
        }); // Prellena el formulario con los valores actuales de la categoría
        setupdate(true); // Abre el modal de edición
    };

    const closeupdate = () => {
        setupdate(false);
        setCategoriaActual(null); // Limpia la categoría actual
    };

    const handinputchange = (event) => {
        const { name, value } = event.target;
        setregister(prevRegister => ({
            ...prevRegister,
            [name]: value
        }));
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

    const crear_categoria = async (e) => {
   
        e.preventDefault();

      if (!register.nombre  || !register.estado) {
        Swal.fire({
            icon: "error",
            text:"Llene los campos",
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }
        if (!register.nombre.trim() || !/^[a-zA-Z\s]*$/.test(register.nombre)) {
          Swal.fire({
            icon: "error",
            text: "El nombre debe ser un texto",
            showConfirmButton: false,
            timer: 1500
          })
          return;
        }
        try {
            const response = await axiosClient.post("/crear_categories", register);
            setregister(response.data.mensaje); // Resetea el formulario
            close();
            Swal.fire({
                icon: "success",
                title: "Categoría creada",
                text: "La categoría ha sido creada exitosamente",
                showConfirmButton: true,
                timer: 3500
            });
            window.location.reload();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Lo sentimos",
                text: "La categoría no ha poidido ser creada exitosamente",
                showConfirmButton: true,
                timer: 3500
            });
        }
    };

    const actualizar_categoria = async (e) => {
       
        e.preventDefault();

      if (!register.nombre  || !register.estado) {
        Swal.fire({
            icon: "error",
            text:"Llene los campos",
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }
        if (!register.nombre.trim() || !/^[a-zA-Z\s]*$/.test(register.nombre)) {
          Swal.fire({
            icon: "error",
            text: "El nombre debe ser un texto",
            showConfirmButton: false,
            timer: 1500
          })
          return;
        }
        try {
            const response = await axiosClient.put(`/actualizar_categories/${categoriaActual.id}`, register);
                setCategoria(response.data.mensaje)
                console.log(response.data.mensaje)
            closeupdate();
            Swal.fire({
                icon: "success",
                title: "Categoría actualizada",
                text: "La categoría ha sido actualizada exitosamente",
                showConfirmButton: true,
                timer: 3500
            });
            window.location.reload();
        } catch (error) {
            console.log("Error al actualizar la categoría:", error);
        }
    };

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
                text: "La categoría no ha poidido ser creada exitosamente",
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
                    <button onClick={open}><FontAwesomeIcon icon={faPlus} /> Crear Categoria</button>
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
                <DataTable
                    className="pt-14"
                    columns={columns}
                    data={filteredCategorias}
                    pagination
                    paginationPerPage={4}
                    paginationRowsPerPageOptions={[1, 2, 3]}
                    conditionalRowStyles={conditionalRowStyles}
                />
            </div>
            {openmodal && (
                <div className="bg-[#1999a6] absolute left-[25%] bottom-[35%] w-[45%] rounded-xl p-5">
                    <button onClick={close} className="absolute top-2 right-2">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <h1>Crear Categoria</h1>
                    <form onSubmit={crear_categoria}>
                        <label>Ingrese El Nombre</label>
                        <br />
                        <input
                            type="text"
                            name="nombre"
                            className="w-[60%] border-2 bg-slate-200 h-full rounded-xl pl-5"
                            placeholder="Ingrese El Nombre de La Categoria"
                            value={register.nombre}
                            onChange={handinputchange}
                        />
                        <br />
                        <label>Seleccione Un Estado</label>
                        <br />
                        <select
                            className="w-[60%] border-2 bg-slate-200 h-full rounded-xl pl-5"
                            name="estado"
                            value={register.estado}
                            onChange={handinputchange}
                        >
                            <option hidden>Seleccione</option>
                            <option value="Activo">Activo</option>
                            <option value="Desactivo">Desactivo</option>
                        </select>
                        <br />
                        <input
                            type="submit"
                            className="w-[60%] border-2 bg-slate-200 h-full rounded-xl mt-10 mb-20"
                            value="Crear"
                        />
                    </form>
                </div>
            )}
            {update && categoriaActual && (
                <div className="bg-[#1999a6] absolute left-[29%] w-[45%] rounded-xl p-5">
                    <button onClick={closeupdate} className="absolute top-2 right-2">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <h1>Actualizar Categoria</h1>
                    <form onSubmit={actualizar_categoria}>
                        <label>Ingrese El Nombre</label>
                        <br />
                        <input
                            type="text"
                            name="nombre"
                            className="w-[60%] border-2 bg-slate-200 h-full rounded-xl pl-5"
                            placeholder="Ingrese El Nombre de La Categoria"
                            value={register.nombre}
                            onChange={handinputchange}
                        />
                        <br />
                        <label>Seleccione Un Estado</label>
                        <br />
                        <select
                            className="w-[60%] border-2 bg-slate-200 h-full rounded-xl pl-5"
                            name="estado"
                            value={register.estado}
                            onChange={handinputchange}
                        >
                            <option hidden>Seleccione</option>
                            <option value="Activo">Activo</option>
                            <option value="Desactivo">Desactivo</option>
                        </select>
                        <br />
                        <input
                            type="submit"
                            className="w-[60%] border-2 bg-slate-200 h-full rounded-xl mt-10 mb-20"
                            value="Actualizar"
                        />
                    </form>
                </div>
            )}
        </>
    );
};

export default Categorias;
