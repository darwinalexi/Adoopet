import { Router } from "express";
import { actualizar_gender, crear_gender, eliminar_gender, listar_gender } from "../controller/controller.gender.js";

export const router_gender= Router();

router_gender.get("/listar_gender",listar_gender)
router_gender.post("/crear_gender",crear_gender)
router_gender.put("/actualizar_gender/:id",actualizar_gender)
router_gender.delete("/eliminar_gender/:id",eliminar_gender)