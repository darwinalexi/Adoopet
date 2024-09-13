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
import { baseUrl } from './utils/data';
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

const getimage = (foto) => {
  const baseUrls = `${baseUrl}/img/`;
  //si hay muchas img crea una url para cada una y las separa por una ,
  return foto.split(',').map(image => `${baseUrls}${image.trim()}`);
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
      <div className="overflow-x-auto relative top-36">
          {mascotas.length > 0 ? (
             <>
            <DataTable
            columns={columns}
            data={mascotas}
            />
            <div className='grid grid-cols-2'>
              <PDFDownloadLink document={<AdoptPero data={mascotas} />} fileName={`Reporte-Adopciones.pdf`}>
                {({ loading }) => (loading ? 'Cargando documento...' : <button className="bg-teal-500 text-white p-2 rounded">Descargar Reporte en PDF</button>)}
              </PDFDownloadLink>
              <button className="bg-teal-500 text-white p-2 rounded" onClick={excel}>Generar Excel</button>
              </div>
            </>
            
          ) : (
            <div className="text-center py-4">
            <p>No Hay Registros Que Mostrar</p>
          </div>
          )}       
      </div>
      
          {show &&( <Detalles data={petselect} onclose={close} />) }
          {pet && (<ExcelRepot data={mascotas}/>)}
      
  </>
)


};

export default Pets;