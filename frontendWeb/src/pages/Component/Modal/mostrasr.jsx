import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Detalles({onclose, data}){
    return(
        <div className="absolute top-20 left-[50%] transform -translate-x-1/2 bg-white p-4 shadow-lg rounded-lg w-1/2">
        <button onClick={onclose} className="absolute top-2 right-2">
          <FontAwesomeIcon icon={faClose}  className="size-10"/>
        </button>
        <h1 className="text-xl font-bold">Detalles de la Mascota</h1>
        <p><strong>Nombre:</strong> {data.nombre_mascota}</p>
        <p><strong>Edad:</strong> {data.edad} años</p>
        <p><strong>Raza:</strong> {data.nombre_raza}</p>
        <p><strong>Categoría:</strong> {data.nombre_categoria}</p>
        <p><strong>Género:</strong> {data.genero}</p>
        <p><strong>Descripción:</strong> {data.descripcion}</p>
        <p><strong>Estado:</strong> {data.estado}</p>
        <p><strong>Estado Vacuna:</strong> {data.estado_vacuna}</p>
        <p><strong>Usuario que Registro  la mascota:</strong> {data.nombre_usuario}</p>
        <p><strong>Historial Medico :</strong> {data.historial_medico}</p>
        <p><strong>Departamento:</strong> {data.nombre_departamento}</p>
        <p><strong>Municipio:</strong> {data.municipio}</p>
      </div>
    )
  }
  export default  Detalles;