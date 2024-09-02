import {Router} from"express"
import { actualizar_pet, borrar, contaradopciones, crear_adopcion, listar_adopciones, listar_solicitudes, listar_solicitudes_aceptadas} from "../controller/controller.adopciones.js";
export const router_a= Router();

router_a.post("/crear_adopcion", crear_adopcion)
router_a.delete("/eliminar_adopcion/:id/:id_mascota", borrar)
router_a.get("/listar_adopciones", listar_adopciones)
router_a.put("/adoptar/:id_mascota", actualizar_pet)
router_a.get("/contar_adopciones", contaradopciones)
router_a.get("/solicitudes/:id", listar_solicitudes)
router_a.get("/solicitudes_aceptadas/:id", listar_solicitudes_aceptadas)
