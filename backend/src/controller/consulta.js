import { Conexion } from "../database/conexion.js";



export const name_races = async (req, res) => {
    try {
      const result = await Conexion.query(
        "SELECT r.nombre_r AS nombre_mas FROM mascotas m JOIN razas r ON m.raza = r.id"
      );
      const listar_name_pets = result[0];
  
      if (listar_name_pets.length > 0) {
        res.status(200).json(listar_name_pets);
      } else {
        res.status(204).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: "Ocurrió un error en el servidor",
      });
    }
  };