import {Router} from"express"
import { actualizar_vacuna, borrar_vacuna, crear_vacuna, buscar_vacuna, listar_vacunas } from "../controller/controller.vacunas.js";

export const router_v= Router();

router_v.post("/crear_vacuna", crear_vacuna)
router_v.put("/actualizar_vacunas/:id", actualizar_vacuna)
router_v.delete("/borrar_vacuna/:id", borrar_vacuna)
router_v.get("/buscar_vacuna/:id", buscar_vacuna)
router_v.get("/listar_vacunas", listar_vacunas)