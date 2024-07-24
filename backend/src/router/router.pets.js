import { Router } from "express";
import { actualizar_pets,  crear_pets, eliminar_pets, listar_mascota, listar_pets_no_adop, saveimg } from "../controller/controller.pets.js";
import { validator_create } from "../middlewares/middleware.pets.js";
const ruta_pets= Router();


ruta_pets.post("/crear_pets",saveimg, crear_pets)
ruta_pets.put("/actualizar_pets/:id",saveimg,actualizar_pets)
ruta_pets.delete("/eliminar_pets/:id",eliminar_pets)
ruta_pets.get("/buscar_mascota/:id", listar_mascota)
ruta_pets.get("/listar_no_adoptados", listar_pets_no_adop)



export default ruta_pets