import { Router } from "express";
import { actualizar_municipio, crear_municipio, elimninar_municipio, listar_mnicipios } from "../controller/controller.municipios.js";

export const ruta_muni= Router();

ruta_muni.get("/listar_municipios", listar_mnicipios)
ruta_muni.post("/crear_municipios", crear_municipio)
ruta_muni.put("/actualiza_municipio/:id", actualizar_municipio)
ruta_muni.delete("/eliminiar_municipio/:id", elimninar_municipio)