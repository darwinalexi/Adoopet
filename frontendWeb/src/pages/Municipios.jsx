import { useEffect, useState } from "react";
import axiosClient from "./utils/axiosClent";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditMunicipio from "./Component/Modal/EditMunicipio";
import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";
import Municicipioscreate from "./Component/Modal/Municipios";
import Swal from 'sweetalert2'; // Ensure you have sweetalert2 imported

function Municipios() {
  const [municipios, setMunicipios] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selection, setSelection] = useState(null);
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openHeader, setOpenHeader] = useState(true);

  const open = (municipio) => {
    setSelection(municipio);
    setOpenUpdate(true);
    setOpenHeader(false); // Ocultar el encabezado cuando se edita
  };

  const close = () => {
    setOpenUpdate(false);
    setOpenHeader(true); // Mostrar el encabezado cuando se cierra el modal de edición
  };

  const openCreate = () => {
    setModal(true);
    setOpenHeader(false); // Ocultar el encabezado cuando se crea
  };

  const closeCreate = () => {
    setModal(false);
    setOpenHeader(true); // Mostrar el encabezado cuando se cierra el modal de creación
  };

  const listar = async () => {
    try {
      const response = await axiosClient.get("/listar_municipios");
      setMunicipios(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listar();
  }, []);

  const eliminarMunicipio = async (id) => {
    try {
      const response = await axiosClient.delete(`/eliminiar_municipio/${id}`);
      console.log("respuesta", response.data.mensaje);
      Swal.fire({
        icon: "success",
        text: response.data.mensaje,
        showConfirmButton: false,
        timer: 1500
      });
      listar(); // Refresh list without reload
    } catch (error) {
      console.log(error);
    }
  };

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
      name: 'Codigo Dane',
      selector: row => row.codigo_dane,
    },
    {
      name: "Acción",
      cell: row => (
        <div className="flex space-x-2">
          <button onClick={() => eliminarMunicipio(row.id)}>
            <FontAwesomeIcon icon={faTrashAlt} color="red" className="size-5" />
          </button>
          <button onClick={() => open(row)}>
            <FontAwesomeIcon icon={faEdit} color="#1999a6" className="size-5" />
          </button>
        </div>
      )
    },
  ];

  const filteredMunicipios = municipios.filter(muni => {
    const nombre = muni.nombre ? muni.nombre.toLowerCase() : '';
    return nombre.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      {openHeader &&( <Header />)}
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
      <div className="mt-32">
        <h1>Municipios</h1>
        <button className="bg-[#1999a6] rounded-lg p-2" onClick={openCreate}>
          Crear Municipio
        </button>
        <DataTable 
          columns={columns}
          data={filteredMunicipios}
          pagination
          paginationPerPage={4}
          paginationRowsPerPageOptions={[1, 2, 3]}
        />
        {openUpdate && selection && (
          <EditMunicipio onclose={close} datos={selection} />
        )}
        {modal && <Municicipioscreate onclose={closeCreate} />}
      </div>
    </>
  );
}

export default Municipios;
