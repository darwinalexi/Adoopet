import { Conexion } from "../database/conexion.js";

export const listar_categories= async(req,res)=>{
    try {
        const [listar]= await Conexion.query("select*from categorias")

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

export const crear_categories= async(req,res)=>{
    try {
        const {id,nombre}=req.body
        const [crear]= await Conexion.query("insert into categorias(id, nombre)values(?,?)",[id,nombre])

        if (crear.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se creo con exito"
            })
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal no se creoe l registro"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })   
    }
}


export const update_categories= async(req,res)=>{
    try {
        const {id}=req.params;
        const {nombre}=req.body
        const [crear]= await Conexion.query("update categorias set nombre=? where id=?",[nombre, id])

        if (crear.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se actualizo con exito"
            })
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal no se creo el registro"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })   
    }
}

export const delete_categories= async(req,res)=>{
    try {
        const {id}=req.params;
        const [eliminar]= await Conexion.query("delete from categorias",[id])

        if (eliminar.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se elimino con exito"
            })
        }else{
            res.status(404).json({
                "mensaje":"algo salio mal no se pudo eliminar el registro"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })   
    }
}