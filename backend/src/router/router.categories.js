import { Router } from "express";
import { crear_categories, delete_categories, listar_categories, update_categories } from "../controller/controller.categories.js";
const rutas_categores= Router();

rutas_categores.get("/listar_categories", listar_categories)
rutas_categores.post("/crear_categories",crear_categories)
rutas_categores.put("/actualizar_categories/:id",update_categories)
rutas_categores.delete("/eliminar_categories/:id",delete_categories)

export default rutas_categores