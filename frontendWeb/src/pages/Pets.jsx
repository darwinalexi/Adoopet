import { useEffect, useState } from 'react';
import Header from './Component/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axiosClient from './utils/axiosClent';
import DataTable from "react-data-table-component"
import { Sidebar } from './Component/Siderbar/siderbar';
import { PDFDownloadLink } from "@react-pdf/renderer";
import AdoptPero from './Component/GeeneratorPdf/Perro.Adopt';
import Detalles from './Component/Modal/mostrasr';
import ExcelRepot from './Component/GeneraatorExecel/generAEXCEL';

const Pets = () =>{
const [mascotas, setmascotas]= useState([]);
const [show, openshow]=useState(false);
const [petselect, setselect]= useState(false)
const [pet, set_pet]= useState(false)


const open= (mascotas)=>{
  setselect(mascotas)
  openshow(true)
}
const close= ()=>{
  openshow(false)
}
const excel= ()=>{
  set_pet(true)
}

const listar_mascotas= async()=>{
  try {
    
    const listar= await axiosClient.get("/listar_pets")
    setmascotas(listar.data)
    console.log("mascot",listar.data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
listar_mascotas();
},[])

const columns = [
  {
      name: 'Imagen',
      selector: row => <img src={`http://localhost:4001/img/${row.foto}`} alt={`Imagen de ${row.nombre_mascota}`} className="w-[100px] h-[75px] rounded-xl" />,
      sortable: false,
      width: '150px',
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
             
                  <>
                      <button onClick={() => open(row)}>
                          <FontAwesomeIcon icon={faSearch} className="text-teal-500" />
                      </button>
                  </>
          
          </div>
      ),
      sortable: false,
  },
];


return(
  <>
  <Header/>
  <Sidebar/>
      <div className='w-[90%] grid grid-rows-2 relative top-24 '>
          <div>
          <div>  
        <DataTable
        columns={columns}
        data={mascotas}
        /></div>
              <div className='grid grid-cols-2'>
              <PDFDownloadLink document={<AdoptPero data={mascotas} />} fileName={`Reporte-Adopciones.pdf`}>
                {({ loading }) => (loading ? 'Cargando documento...' : <button className="bg-teal-500 text-white p-2 rounded">Descargar Reporte en PDF</button>)}
              </PDFDownloadLink>
              <button className="bg-teal-500 text-white p-2 rounded" onClick={excel}>Generar Excel</button>
              </div>
          </div>
          {show &&( <Detalles data={petselect} onclose={close} />) }
          {pet && (<ExcelRepot data={mascotas}/>)}
      </div>
  </>
)


};

export default Pets;