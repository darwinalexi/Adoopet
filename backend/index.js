import express from"express";
import body_parser from"body-parser"
import ruta_user from "./src/router/router.js";
import ruta_pets from "./src/router/router.pets.js";
import { router_gender } from "./src/router/router.gender.js";
import ruta_races from "./src/router/router.races.js";
import rutas_categores from "./src/router/router.categories.js";
import ruta_Auth from "./src/router/router.Auth.js";
import cors from "cors"
import ruta_consulta from "./src/router/consultas.js";
import { validarToken } from "./src/controller/controller.Auth.js";
import { router_v } from "./src/router/router.vacunas.js";
const server= express();

const port= 4001;

server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}))

server.use(cors());

server.use(express.static('./public'))

server.use(ruta_Auth)
server.use( validarToken,ruta_races)
server.use(validarToken,ruta_user)
server.use(validarToken,ruta_pets)
server.use(validarToken,rutas_categores)
server.use(validarToken,router_gender)
server.use(router_v)

server.listen(port,()=>{
    console.log("servidor corriendo en el pureto "+port)
})