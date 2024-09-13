import { HotTable, HotColumn } from '@handsontable/react';
import { useEffect, useRef } from 'react';
import 'handsontable/dist/handsontable.full.css';
import '../Modal/css/styles.css';
import * as XLSX from 'xlsx';

export function Execel({ data }) {
    const hotTableComponent = useRef(null); // Referencia a la instancia de Handsontable

    useEffect(() => {
        console.log(data);
    }, [data]);

    // Datos de ejemplo si no hay datos
    const defaultData = data.length ? data : [
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
    ];

    // Función para exportar a Excel
    const exportToExcel = () => {
        try {
          if (hotTableComponent.current) {
            const hotInstance = hotTableComponent.current.hotInstance; // obtiene la instancia de Handsontable
            const data = hotInstance.getData(); // obtiene los datos de la tabla
            const headers = [
              "Usuario", "Género", "Categoría", "Raza", "fecha nacimiento", "Estado",
              "E.Vacuna", "Historial Médico", "Municipio", "Departamento",
              "Nombre", "Descripción"
            ];
            //DATAWIDTH  se añade para poder combinar y mostra a tabla ordenadamente
            const dataWithHeaders = data.map((row, index) => {
              return headers.reduce((acc, header, columnIndex) => {
                acc[header] = row[columnIndex];
                return acc;
              }, {});
            });
      
            const ws = XLSX.utils.json_to_sheet(dataWithHeaders); // Convierte los datos a una hoja de Excel
            const wb = XLSX.utils.book_new(); // Crea un nuevo libro de trabajo
            XLSX.utils.book_append_sheet(wb, ws, 'datos'); // Añade la hoja al libro
            XLSX.writeFile(wb, 'reporte.xlsx'); // Escribe el archivo y lo descarga
          }
        } catch (error) {
          console.log("paila", error)
        }
      };

    return (
        <div className="bg-white h-full fixed left-0 top-0 w-full z-10">

            <div className="overflow-auto p-4 relative top-[15%]">
            <h1 className='text-2xl relative top-[23%]'>Reporte De Mascotas Por Adoptar</h1>
                <HotTable
                    ref={hotTableComponent}
                    className="my-hot-table"
                    data={defaultData}
                    rowHeaders={true}
                    columnSorting={true}
                    contextMenu={true}
                    //no permite hacer modiificaciones a la info
                    readOnly={true}
                    height={400}
                    licenseKey="non-commercial-and-evaluation"
                    colWidths={[130, 90, 80, 80, 80, 90, 100, 110, 100, 160, 110, 110, 90]} // Ajusta el ancho de columnas
                >
                    <HotColumn data="nombre_usuario" title="Usuario que Registro La Mascota" />
                    <HotColumn data="genero" title="Género" />
                    <HotColumn data="nombre_categoria" title="Categoría" />
                    <HotColumn data="nombre_raza" title="Raza" />
                    <HotColumn data="fecha_nacimiento" title="Fe.Na" />
                    <HotColumn data="estado" title="Estado" />
                    <HotColumn data="estado_vacuna" title="Estado Vacuna" />
                    <HotColumn data="historial_medico" title="Historial Médico" />
                    <HotColumn data="municipio" title="Municipio" />
                    <HotColumn data="nombre_departamento" title="Nombre Departamento" />
                    <HotColumn data="nombre_mascota" title="Nombre Mascota" />
                    <HotColumn data="descripcion" title="Descripción" />
                </HotTable>
              
            </div>
            <button onClick={exportToExcel} className="bg-[#1999a6] text-white font-bold p-6 rounded-lg absolute left-[44%]">
                Exportar a Excel
            </button>
        </div>
    );
}
