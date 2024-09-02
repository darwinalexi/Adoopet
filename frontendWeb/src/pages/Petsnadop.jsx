import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "./utils/axiosClent";

import PDF from "./Component/GeeneratorPdf/Pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Detalles from "./Component/Modal/mostrasr";
import { Execel } from "./Component/GeneraatorExecel/Ecexel";
import DataTable from "react-data-table-component";
import Edit_Mascot from "./Component/Modal/EditMascotas";


const Petsnadop = () => {
  const [mascotasp, setMascotasp] = useState([]);
  const [crear, setCrear] = useState(null);
  const [createPet, setCreatePet] = useState(false);
  const [currentPetId, setCurrentPetId] = useState(null);
  const [actualizar, setActualizar] = useState(false);
  const [show, setShow] = useState(false);
  const [idPet, setIdPet] = useState(null);
  const [file, setOpenFile] = useState(false);

  // Estado para búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");

  
  const openModal = (pet) => {
    setCrear(pet);
    setCurrentPetId(pet.id);
    setCreatePet(true);
  };

  const openUpdate = (mascota) => {
    console.log("openmodal")
    setCurrentPetId(mascota);
    setActualizar(true);
  };

  const closeUpdate = () => {
    console.log("cerado")
    setCurrentPetId(null);
    setActualizar(false);
  };

  const openShow = (mascota) => {
    setShow(true);
    setIdPet(mascota);
  };

  const closeShow = () => {
    setShow(false);
  };




  const listarMascotasNoAdoptadas = async () => {
    try {
      const listar = await axiosClient.get("/listar_no_adoptados");
      setMascotasp(listar.data);
      console.log("masss", listar.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarMascotasNoAdoptadas();
  }, []);


  const borrarMascota = async (id) => {
    try {
      await axiosClient.delete(`/eliminar_pets/${id}`);
      setMascotasp(prevMas => prevMas.filter(pet => pet.id !== id));
    } catch (error) {
      console.log(error);
    }
  };



  const [usuarioTipo, setUsuarioTipo] = useState('');

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
    const tipo = usuarios ? usuarios.tipo : '';
    setUsuarioTipo(tipo);
  }, []);

  // Filtrar datos
  const datos = mascotasp.filter(mascota => {
    const nombre = mascota.nombre_mascota ? mascota.nombre_mascota.toLowerCase() : '';
    const filterByName = nombre.includes(searchTerm.toLowerCase());
    const filterByCategory = selectedState ? mascota.nombre_categoria === selectedState : true;
    return filterByName && filterByCategory;
  });

  // Encuentra la mascota seleccionada
  const selectedPet = mascotasp.find(mascota => mascota.id === idPet);

  

  const getimage = (foto) => {
    const baseUrl = 'http://localhost:4001/img/';
    //si hay muchas img crea una url para cada una y las separa por una ,
    return foto.split(',').map(image => `${baseUrl}${image.trim()}`);
  };


  const columns = [
    {
      name: 'Imagen',
      selector: row => {
        const urls = getimage(row.foto);
        // Obtiene solo la primera imagen
        const img = urls.length > 0 ? urls[0] : ''; 
        return (
          <img
            src={img}
            alt={`Imagen de ${row.nombre_mascota}`}
            className="w-[100px] h-[75px] rounded-xl"
          />
        );
      },
      sortable: false,
      width: '200px',
    },
    {
      name: 'Nombre',
      selector: row => row.nombre_mascota,
      sortable: true,
    },
    {
      name: 'Edad',
      selector: row => `${row.edad} años`,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.descripcion,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <div className="flex gap-2">
          {usuarioTipo === 'Administrador' && (
            <>
              <button onClick={() => borrarMascota(row.id)}>
                <FontAwesomeIcon icon={faTrashAlt} className="text-red-500" />
              </button>
              <button onClick={() => openUpdate(row)} >
                <FontAwesomeIcon icon={faEdit} className="text-teal-500" />
              </button>
              <button onClick={() => openShow(row)}>
                <FontAwesomeIcon icon={faSearch} className="text-teal-500" />
              </button>
              <PDFDownloadLink document={<PDF data={row} />} fileName={`Reporte-${row.nombre_mascota}.pdf`}>
                {({ loading }) => (loading ? 'Cargando documento...' : <button className="bg-teal-500 text-white p-2 rounded">Descargar PDF</button>)}
              </PDFDownloadLink>
            </>
          )}
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <>
      <Header />
      <Sidebar />
      <div className="w-[100%]   fixed  left-0 top-[23%]">
        <div className="relative right-[40%] top-[67%]">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 border-b border-b-[#1999a6] focus:outline-0"
          />
        </div>
        <div className="relative left-[33%]">
          <div>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="p-2 border-b border-b-[#1999a6] border-t border-t-[#1999a6] border-l border-l-[#1999a6] border-r border-r-[#1999a6] focus:outline-0"
            >
              <option hidden>Categorías</option>
              <option value="">Todos</option>
              <option value="grande">Grande</option>
              <option value="pequeño">Pequeño</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={datos}
          pagination
          paginationPerPage={4}
          paginationRowsPerPageOptions={[1, 2, 3]}
        />

        <button onClick={() => setOpenFile(true)} className="bg-[#1999a6] text-white font-bold p-6 rounded-lg h-[23%]">Generar Reporte En Excel</button>

        {show && <Detalles data={idPet} onclose={closeShow} />}
        {/*genera  el execl colos datos filtrados*/}
        {file && <Execel data={datos} onclose={() => setOpenFile(false)} />}
        {actualizar && <Edit_Mascot data={currentPetId} onclose={closeUpdate} />}
      </div>
    </>
  );
};

export default Petsnadop;
