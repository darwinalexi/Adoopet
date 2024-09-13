import express from"express";
import body_parser from"body-parser"
import ruta_user from "./src/router/router.js";
import ruta_pets from "./src/router/router.pets.js";
import ruta_races from "./src/router/router.races.js";
import rutas_categores from "./src/router/router.categories.js";
import ruta_Auth from "./src/router/router.Auth.js";
import cors from "cors"
import { validarToken } from "./src/controller/controller.Auth.js";
import { router_a } from "./src/router/router.adopciones.js";
import { router_gender } from "./src/router/router.gender.js";
import { ruta_muni } from "./src/router/router.municipios.js";
import { ruta_d } from "./src/router/router.departamentro.js";
import { vacunas } from "./src/router/router.vacunas.js";
const server= express();

const port= 6831;

server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}))

server.use(cors());

server.use(express.static('./public'))

server.get('/', (req, res) =>{
    res.send('Hola mundo')
})

server.use(ruta_Auth)
server.use(validarToken,ruta_races)
server.use(validarToken, ruta_user)
server.use(validarToken, ruta_pets)
server.use(validarToken,rutas_categores)
server.use(validarToken, router_a)
server.use(validarToken, router_gender)
server.use(validarToken, ruta_muni)
server.use(validarToken, ruta_d)
server.use(validarToken,vacunas)
server.listen(port,()=>{
    console.log("servidor corriendo en el puerto "+port)
})