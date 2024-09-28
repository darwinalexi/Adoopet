import { Conexion } from "../database/conexion.js";

export const listar_vacunas= async(req,res)=>{
    try {
        const [listar]= await Conexion.query("select*from vacunas")

        if (listar.length>0) {
            res.status(200).json(listar)
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal no se encontro registros"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })   
    }
}
export const listar_vacunas_n= async(req,res)=>{
    try {
        const [listar]= await Conexion.query("SELECT * FROM vacunas WHERE nombre != 'Ninguna'")

        if (listar.length>0) {
            res.status(200).json(listar)
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal no se encontro registros"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })   
    }
}

export const crear_vacunas= async(req,res)=>{
    try {
        const{nombre}= req.body;
        const [crear]= await Conexion.query("insert into vacunas (nombre)value(?)",[nombre])

        if (crear.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se creo con exito la vacuna"
            })
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal no se crear el registro"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })   
    }
}

export const borrar_vacunas= async(req,res)=>{
    try {
        const{id}= req.params;

        
        const [relacion] = await Conexion.query("SELECT COUNT(*) AS total FROM mascotas WHERE vacunas = ?", [id]);

        if (relacion[0].total > 0) {
            return res.status(404).json({
                "mensaje": "No se puede eliminar la vacuna porque está relacionado con una mascota."
            });
        }

        const [borrar]= await Conexion.query("delete from  vacunas where id=?",[id])

        if (borrar.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se borron con exito la vacuna"
            })
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal no se borro el registro"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })   
    }
}

export const actualizar_vacunas= async(req,res)=>{
    try {
        const{id}= req.params;
        const {nombre}= req.body
        const [borrar]= await Conexion.query("update vacunas set nombre=? where id=?",[nombre, id])

        if (borrar.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se actualizo con exito la vacuna"
            })
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal no se actualizo  el registro"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })   
    }
}