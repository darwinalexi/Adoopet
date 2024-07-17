import { Conexion } from "../database/conexion.js";

export const crear_vacuna= async(req, res)=>{
    try {
        const {nombre, id_mascota}= req.body;

        const [consulta]= await Conexion.query("insert into vacunas(nombre, id_mascota)values(?,?)",[nombre,id_mascota])
    if (consulta.affectedRows>0) {
        res.status(200).json({
            "MENSAJE":"se creo exitosamente"
        })
    }else{
        res.status(404).json({
            "MENSAJE":"algo pasa"
        })
    }
    
    } catch (error) {
        res.status(500).json({
            "MENSAJE":error
        })
    }
}

export const actualizar_vacuna= async(req, res)=>{
    try {
        const {id}= req.params;
        const {nombre, id_mascota}= req.body;

        const [consulta]= await Conexion.query(" update vacunas set nombre=?, id_mascota=? where id=?",[nombre,id_mascota, id])
    if (consulta.affectedRows>0) {
        res.status(200).json({
            "MENSAJE":"se actualizo exitosamente"
        })
    }else{
        res.status(404).json({
            "MENSAJE":"algo pasa"
        })
    }
    
    } catch (error) {
        res.status(500).json({
            "MENSAJE":error
        })
    }
}


export const borrar_vacuna= async(req, res)=>{
    try {
        const {id}= req.params;

        const [consulta]= await Conexion.query("delete from vacunas where id=?",[id])
    if (consulta.affectedRows>0) {
        res.status(200).json({
            "MENSAJE":"se borro exitosamente"
        })
    }else{
        res.status(404).json({
            "MENSAJE":"algo pasa"
        })
    }
    
    } catch (error) {
        res.status(500).json({
            "MENSAJE":error
        })
    }
}

export const buscar_vacuna= async(req, res)=>{
    try {
        const {id}= req.params;

        const [consulta]= await Conexion.query("select*from vacunas where id=?",[id])
    if (consulta.length>0) {
        res.status(200).json(consulta)
    }else{
        res.status(404).json({
            "MENSAJE":"algo pasa"
        })
    }
    
    } catch (error) {
        res.status(500).json({
            "MENSAJE":error
        })
    }
}

export const listar_vacunas= async(req, res)=>{
    try {
        const [consulta]= await Conexion.query("select*from vacunas")
    if (consulta.length>0) {
        res.status(200).json(consulta)
    }else{
        res.status(404).json({
            "MENSAJE":"algo pasa"
        })
    }
    
    } catch (error) {
        res.status(500).json({
            "MENSAJE":error
        })
    }
}