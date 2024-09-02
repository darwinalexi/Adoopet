import{Router} from"express"
import { actualizar_vacunas, borrar_vacunas, crear_vacunas, listar_vacunas } from "../controller/controllre.vacunas.js";

export const vacunas= Router();

vacunas.get("/vacunas", listar_vacunas)
vacunas.post("/vacunas", crear_vacunas)
vacunas.delete("/vacunas/:id",borrar_vacunas)
vacunas.put("/vacunas/:id",actualizar_vacunas)