import * as XLSX from 'xlsx';
import { HotTable, HotColumn } from '@handsontable/react';
import { useEffect, useRef } from 'react';
import 'handsontable/dist/handsontable.full.css';
import '../Modal/css/styles.css';

function ExcelRepot({data}) {
    const hottable= useRef(null)

    useEffect(() => {
        console.log(data);
    }, [data]);

    const datos = data.length ? data : [
        {
            nombre_usuario: '',
            genero: '',
            nombre_categoria: '',
            nombre_raza: '',
            edad: '',
            estado: '',
            estado_vacuna: '',
            historial_medico: '',
            municipio: '',
            nombre_departamento: '',
            nombre_mascota: '',
            descripcion: ''
        },
]


const exportToExcel = () => {
    try {
       if (hottable.current) {
           const hotInstance = hottable.current.hotInstance; // Obtén la instancia de Handsontable
           const datos = hotInstance.getData(); // Obtén los datos de la tabla
           const ws = XLSX.utils.json_to_sheet(datos, { header: [
               "nombre_usuario", "genero", "nombre_categoria", "nombre_raza", "edad", "estado",
               "estado_vacuna", "foto", "historial_medico", "municipio", "nombre_departamento",
               "nombre_mascota", "descripcion"
           ] }); // Convierte los datos a una hoja de Excel
           const wb = XLSX.utils.book_new(); // Crea un nuevo libro de trabajo
           XLSX.utils.book_append_sheet(wb, ws, 'datos'); // Añade la hoja al libro
           XLSX.writeFile(wb, 'Reporte de Adoptados.xlsx'); // Escribe el archivo y lo descarga
       }
    } catch (error) {
       
    }console.log(error)
   };
    return(
        <div className="bg-white h-full fixed left-0 top-0 w-full z-10">
            <div className="overflow-auto p-4 relative top-[15%]">
            <h1 className='text-2xl relative top-[23%]'>Reporte De Mascotas  Adoptadas</h1>
     <HotTable
                    ref={hottable}
                     className="my-hot-table"
                     data={datos}
                     rowHeaders={true}
                     columnSorting={true}
                     contextMenu={true}
                     //no permite hacer modiificaciones a la info
                     readOnly={true}
                     height={400}
                     licenseKey="non-commercial-and-evaluation"
                     colWidths={[140, 90, 90, 90, 80, 90, 100, 130, 90, 100, 100, 100, 130]} 
                    >
                        <HotColumn data="nombre_usuario" title="Usuario" />
                    <HotColumn data="genero" title="Género" />
                    <HotColumn data="nombre_categoria" title="Categoría" />
                    <HotColumn data="nombre_raza" title="Raza" />
                    <HotColumn data="edad" title="Edad" />
                    <HotColumn data="estado" title="Estado" />
                    <HotColumn data="estado_vacuna" title="Estado Vacuna" />
                    <HotColumn data="historial_medico" title="Historial Médico" />
                    <HotColumn data="municipio" title="Municipio" />
                    <HotColumn data="nombre_departamento" title="Departamento" />
                    <HotColumn data="nombre_mascota" title="Mascota" />
                    <HotColumn data="descripcion" title="Descripción" />
                    </HotTable>

                    <button  onClick={exportToExcel} className="bg-teal-500 text-white p-2 rounded relative top-24">Exportar A Excel</button>
            </div>
        </div>
    )
}

export default ExcelRepot;