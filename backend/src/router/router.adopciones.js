import {Router} from"express"
import { actualizar_pet, borrar, contaradopciones, crear_adopcion, listar_adopciones} from "../controller/controller.adopciones.js";
export const router_a= Router();

router_a.post("/crear_adopcion", crear_adopcion)
router_a.delete("/eliminar_adopcion/:id/:id_mascota", borrar)
router_a.get("/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJpYXQiOjE3MjMwNjM5MzMsImV4cCI6MTcyMzEwNzEzM30.bNJKlTAKT-QDOa_b4T3zYWV-OUp_5fAszhVhjDEaur0", listar_adopciones)
router_a.put("/adoptar/:id/:id_mascota", actualizar_pet)
router_a.get("/contar_adopciones", contaradopciones)
