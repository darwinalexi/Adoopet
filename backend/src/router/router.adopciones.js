import {Router} from"express"
import { borrar, crear_adopcion, listar_adopciones} from "../controller/controller.adopciones.js";

export const router_a= Router();

router_a.post("/crear_adopcion", crear_adopcion)
router_a.delete("/eliminar_adopcion/:id", borrar)
router_a.get("/listar_adopciones", listar_adopciones)