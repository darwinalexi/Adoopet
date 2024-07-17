
import { Conexion } from "../database/conexion.js";

export const listar_user= async(req,res)=>{
    try {
        
       const [consulta]= await Conexion.query("select*from usuarios");

        if(consulta.length>0){
            res.status(200).json(consulta)
        }else{
            res.status(404).json({
                "mensaje":"no se encontro nada"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const crear_user=async(req,res)=>{
    try{
        const{nombre,email,password,tipo}=req.body
        const [crear]= await Conexion.query("insert into usuarios(nombre,email,password,tipo)values(?,?,?,?)",[nombre,email,password, tipo])

        if (crear.affectedRows>0) {
            res.status(200).json({
                "menaje":"se creo con exito"
            })
        }else{
            res.status(404).json({
                "message":"no se pudo crear el usurio"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
                "mensaje":error
        })
    }
}

export const actualizar_user=async(req,res)=>{
    try{
        const {id}=req.params
        const{ nombre_completo,correo,contrasena}=req.body
        const [actualiza]= await Conexion.query("update usuarios set nombre_completo=?, correo=?,contrasena=? where id=?",[nombre_completo,correo,contrasena, id])

        if (actualiza.affectedRows>0) {
            res.status(200).json({
                "menaje":" se actualizo con exito"
            })
        }else{
            res.status(404).json({
                "message":"no se pudo actualizar el usurio"
            })
        }
    }catch{
        console.log(error)
        res.status(500).json({
                "mensaje":error
        })
    }
}

export const buscar_user=async(req,res)=>{
    try{
        const {id}=req.params
   
        const [actualiza]= await Conexion.query("select*from usuarios where id=?",[id])

        if (actualiza.length>0) {
            res.status(200).json({
                "menaje":actualiza
            })
        }else{
            res.status(404).json({
                "message":"no se pudo encontrar el usurio"
            })
        }
    }catch{
        console.log(error)
        res.status(500).json({
                "mensaje":error
        })
    }
}

export const contarUsuarios = async (req, res) => {
    try {
        const [resultado] = await Conexion.query("SELECT COUNT(*) as total FROM usuarios");
        if (resultado[0].total > 0) {
            res.status(200).json({ total: resultado[0].total });
           
        } else {
            res.status(404).json({ mensaje: "No se encontraron usuarios" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};