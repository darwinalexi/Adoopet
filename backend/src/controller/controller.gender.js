import { Conexion } from "../database/conexion.js";

export const listar_gender=async(req, res)=>{
    try {
        const[consulta]= await Conexion.query("select*from genero")
        if (consulta.length>0) {
            res.status(200).json(consulta)
        }else{
            res.status(404).json({
                "mensaje":"no hay generos registrados"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}


export const crear_gender=async(req, res)=>{
    try {
        const {nombre}= req.body
        const[consulta]= await Conexion.query("insert into genero(nombre) values(?)",[nombre])
        if (consulta.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se registro el genero"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se registro el genero"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const actualizar_gender=async(req, res)=>{
    try {
        const {id}=req.params
        const {nombre}= req.body
        const[consulta]= await Conexion.query("update generos set nombre=? where id=?",[nombre,id])
        if (consulta.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se actualizo el genero"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se  actualizo el genero"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const eliminar_gender=async(req, res)=>{
    try {
        const {id}=req.params
        const[consulta]= await Conexion.query("delete from  generos where id=?",[id])
        if (consulta.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se elimino el genero"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se  elimino el genero"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}