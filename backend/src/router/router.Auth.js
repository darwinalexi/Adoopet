import { Router } from "express";
import { login } from "../controller/controller.Auth.js";

const ruta_Auth= Router();

ruta_Auth.post("/login",login)

export default ruta_Auth