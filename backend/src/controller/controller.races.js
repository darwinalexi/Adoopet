import { Conexion } from "../database/conexion.js";

export const listar_races= async(req, res)=>{
    try {
        
        const [listar]= await Conexion.query("select*from razas")

        if (listar.length>0) {
            res.status(200).json(listar)
        }else{
            res.status(404).json({
                "mensaje":"paila no hay nada"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const create_races= async(req, res)=>{
    try {
        const{id,nombre_r}=req.body
        const [crear]= await Conexion.query(" insert into razas(id, nombre_r) values(?,?)",[id,nombre_r])

        if (crear.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se creo con exito"
            })
        }else{
            res.status(404).json({
                "mensaje":"paila no se pudo crear nada"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const update_races= async(req, res)=>{
    try {
   const {id}=req.params
   const {nombre}=req.body

   const [actualizar]= await Conexion.query("update razas set nombre_r=? where id=?",[nombre,id])

   if (actualizar.affectedRows>0) {
    res.status(200).json({
        "mensaje":"se actualizo"
    })
   }else{
    res.status(404).json({
        "mensaje":"no se actualizo"
    })
   }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}


export const delete_races= async(req, res)=>{
    try {
   const {id}=req.params
   const [eliminar]= await Conexion.query("delete from razas where id=?",[id])

   if (eliminar.affectedRows>0) {
    res.status(200).json({
        "mensaje":"se elimino"
    })
   }else{
    res.status(404).json({
        "mensaje":"no se elimino"
    })
   }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}