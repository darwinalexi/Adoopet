import { Router } from "express";
import { create_races, delete_races, listar_races, update_races } from "../controller/controller.races.js";

const ruta_races= Router();

ruta_races.get("/listar_races",listar_races)
ruta_races.post("/crear_races",create_races)
ruta_races.put("/actualizar_races/:id",update_races)
ruta_races.delete("/eliminar_races/:id",delete_races)

export default ruta_races