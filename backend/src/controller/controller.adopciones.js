import {Conexion} from "../database/conexion.js"

export const crear_adopcion = async(req, res)=>{
    try {
        const {id_adoptante, edad, id_mascota, estado}= req.body;
        
        if (edad <= 18) {
            return res.status(400).json({
                "mensaje": "La edad mínima para adoptar es mayor a 18 años."
            });
        }
        
        const [crear]= await Conexion.query("insert into adopciones(id_adoptante, edad, id_mascota, estado)values(?,?,?,?)",[id_adoptante,edad,id_mascota, estado])
        
        if (crear.affectedRows>0){
            res.status(200).json({
                "mensaje":"se creo con adopcion la adopcion"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se creo con ecito la adopcion"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const borrar= async(req, res)=>{
    try {
        const {id} =req.params
        const [borrar]= await Conexion.query("delete from adopciones where id=?",[id]);

        if (borrar.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se borro con exito"
            })
        }else{
            res.status(404).json({
                "message":"no  se encpntro la adopcion para eliminar"
            })
        }
    } catch (error) {
        res.status(500).json({
            "message":error
        })
    }
}

export const listar_adopciones= async(req, res)=>{
    try {
        const[listar]= await Conexion.query("select*from adopciones")
        if (listar.length>0) {
            res.status(200).json(listar)
        }
    } catch (error) {
            res.status(500).json(error)
    }
}