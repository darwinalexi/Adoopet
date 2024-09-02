import { Conexion } from "../database/conexion.js";

export const listar_depaertamento= async(req, res)=> {
    try {
        const [listar]= await Conexion.query("select*from departamento")
        if (listar.length>0) {
            res.status(200).json(listar)
        }else{
            res.status(404).json({
                "mensaje":"no existen departamentos"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const create_department= async(req, res)=> {
    try {
        const {nombre, codigo_dane}= req.body;
        const [create]= await Conexion.query("insert into departamento(nombre, codigo_dane)values(?,?)",[nombre, codigo_dane])
        if (create.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se creo el departamento"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se creo el departamento"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const update_department= async(req, res)=> {
    try {
        const {id}= req.params;
        const {nombre, codigo_dane}= req.body;
        const [update]= await Conexion.query("update departamento set nombre=?,  codigo_dane=? where id=?",[nombre, codigo_dane, id])
        if (update.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se actualizo el departamento"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se actualizo el departamento"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}


export const delete_department= async(req, res)=> {
    try {
        const {id}= req.params;
        const [update]= await Conexion.query("delete from departamento where id=?",[id])
        if (update.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se elimino el departamento"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se elimino el departamento"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}