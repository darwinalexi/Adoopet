import {Conexion}from "../database/conexion.js"

export const  listar_mnicipios =async( req, res)=> {
    try {
        const [listar]= await Conexion.query("select*from municipio")
        if (listar.length>0) {
            res.status(200).json(listar)
        }else{
            res.status(404).json({
                "mensaje":"no hay municipios"
            })
        }
    } catch (error) {
    res.status(500).json({
      "mensaje":error
    })
   }
}

export const  crear_municipio =async( req, res)=> {
    try {
        const {nombre, codigo_dane}=  req.body;
        const [crear]= await Conexion.query("insert into municipio (nombre, codigo_dane)values(?,?)",[nombre, codigo_dane])
        if (crear.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se creo el municipio"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se creo el municipio"
            })
        }
    } catch (error) {
    res.status(500).json({
      "mensaje":error
    })
   }
}


export const  actualizar_municipio =async( req, res)=> {
    try {
        const {id}= req.params;
        const {nombre, codigo_dane}=  req.body;
        const [actualizo]= await Conexion.query("update municipio set nombre=?, codigo_dane=? where id=?",[nombre, codigo_dane, id])
        if (actualizo.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se actualizo el municipio"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se creo el municipio"
            })
        }
    } catch (error) {
    res.status(500).json({
      "mensaje":error
    })
   }
}

export const  elimninar_municipio =async( req, res)=> {
    try {
        const {id}= req.params;
        const [relacion] = await Conexion.query("SELECT COUNT(*) AS total FROM mascotas WHERE municipio = ?", [id]);

        if (relacion[0].total > 0) {
            return res.status(404).json({
                "mensaje": "No se puede eliminar el municipio porque está relacionado con una mascota."
            });
        }

        const [actualizo]= await Conexion.query("delete  from municipio where id=?",[id])
        if (actualizo.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se borro el municipio"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se borro el municipio"
            })
        }
    } catch (error) {
    res.status(500).json({
      "mensaje":error
    })
   }
}