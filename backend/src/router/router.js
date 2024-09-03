import { Router } from "express";
import { actualizar_user, borrar, buscar_user, contarUsuarios, crear_user, listar_addmin, listar_type_user, listar_user, listar_users, saveimg } from "../controller/controller.user.js";


 const ruta_user= Router();
ruta_user.get("/listar",listar_user)
ruta_user.get("/listar_user", listar_type_user)
ruta_user.post("/crear",saveimg,crear_user)
ruta_user.put("/actualizar/:id",saveimg,actualizar_user)
ruta_user.get("/buscar/:id",buscar_user)
ruta_user.get("/contar_usuarios", contarUsuarios)
ruta_user.get("/usuarios_seleccioar", listar_users)
ruta_user.delete("/eliminar/:id",borrar)
ruta_user.get("/administrador", listar_addmin)

export default ruta_user