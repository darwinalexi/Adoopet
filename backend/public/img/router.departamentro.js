import { Router } from "express";
import { create_department, delete_department, listar_depaertamento, update_department } from "../controller/controllr.departamento.js";

export const ruta_d= Router();

ruta_d.get("/departamento", listar_depaertamento)
ruta_d.post("/departamento", create_department)
ruta_d.put("/departamento/:id", update_department)
ruta_d.delete("/departamento/:id", delete_department)