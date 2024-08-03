import { Router } from "express";
import { listar_pets,actualizar_pets,  crear_pets, eliminar_pets, listar_mascota, listar_pets_in_adop, listar_pets_no_adop, saveimg, contarmascotas } from "../controller/controller.pets.js";
import { validator_create } from "../middlewares/middleware.pets.js";
const ruta_pets= Router();


ruta_pets.post("/crear_pets",saveimg, crear_pets)
ruta_pets.put("/actualizar_pets/:id",saveimg,actualizar_pets)
ruta_pets.delete("/eliminar_pets/:id",eliminar_pets)
ruta_pets.get("/buscar_mascota/:id", listar_mascota)
ruta_pets.get("/listar_no_adoptados", listar_pets_no_adop)
ruta_pets.get("/listar_pets", listar_pets_in_adop)
ruta_pets.get("/listas_pets_adop/:id", listar_pets)
ruta_pets.get("/contar_mascotas", contarmascotas)

export default ruta_pets