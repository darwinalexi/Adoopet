import { Router } from "express";
import { name_races } from "../controller/consulta.js";

const ruuta_consulta=Router();

ruuta_consulta.get("/nombre", name_races)

export default ruuta_consulta