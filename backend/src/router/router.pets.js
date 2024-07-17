import { Router } from "express";
import { actualizar_pets, actualizar_pets_ADOP, crear_pets, eliminar_pets, listar_mascota,  listar_pets_in_adop, listar_pets_no_adop, listar_pets_pendientes, saveimg } from "../controller/controller.pets.js";
import { validator_create } from "../middlewares/middleware.pets.js";
const ruta_pets= Router();


ruta_pets.get("/listar_pets",listar_pets_in_adop);
ruta_pets.get("/listar_pet_not_adop", listar_pets_no_adop)
ruta_pets.get("/listar_pet_pendiente", listar_pets_pendientes)
ruta_pets.post("/crear_pets",saveimg, crear_pets)
ruta_pets.put("/actualizar_pets/:id",saveimg,actualizar_pets)
ruta_pets.delete("/eliminar_pets/:id",eliminar_pets)
ruta_pets.get("/buscar_mascota/:id", listar_mascota)
ruta_pets.put("/adoptar/:id", actualizar_pets_ADOP)



export default ruta_pets