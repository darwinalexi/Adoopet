import { Conexion } from "../database/conexion.js";
import  multer from"multer";
import { validationResult } from "express-validator";


const storage= multer.diskStorage({
    destination:function(req, file, cb ){
        cb(null, './public/img')
    },
    filename:function(req, file, cb ){
        cb(null, file.originalname)
    }
})

const upload= multer({storage:storage})

export const saveimg=upload.single('foto')

export const listar_pets_in_adop= async(req, res)=>{
    try {
        const [listar] = await Conexion.query("select*from mascotas where estado='Adoptado'");

        if (listar.length > 0) {
            res.status(200).json(listar);
        } else {
            res.status(404).json({ mensaje: "no se encontraron  mascotas registradas"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }

}

export const listar_pets_no_adop= async(req, res)=>{
    try {
        const [listar]= await Conexion.query("select*from mascotas where estado='Por adoptar'");

        if (listar.length>0) {
            res.status(200).json(listar);
        } else {
            res.status(404).json({ mensaje: "no se encontraron  mascotas registradas"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }

}

export const listar_pets_pendientes= async(req, res)=>{
    try {
        const [listar] = await Conexion.query("select*from mascotas where estado='Pendiente'");

        if (listar.length > 0) {
            res.status(200).json(listar);
        } else {
            res.status(404).json({ mensaje: "no se encontraron  mascotas registradas"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }

}


export const crear_pets = async (req, res) => {
    try {
       const {raza, categoria_id, genero_id, nombre_mas, id_vacuna, descripcion,  edad}=req.body;
       const foto=req.file.originalname;
       if (foto==null) {
        return res.status(400).json({ mensaje: "No se ha cargado un archivo" });
      }
 
       const [regiterpets]= await Conexion.query("insert into mascotas(raza, categoria_id,foto,genero_id,nombre_mas, id_vacuna, descripcion, edad)values(?,?,?,?,?,?,?,?)",[raza,categoria_id,foto,genero_id, nombre_mas, id_vacuna,descripcion, edad])       
       if (regiterpets.affectedRows>0) {
        return res.status(200).json({
            "mensaje":"se creo con exito"
        })
        }else{
            res.status(404).json({
                "mensaje":"no se creo con exito"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "mensaje":error });
    }
};



export const actualizar_pets = async(req, res)=>{
    try {
        const{id}= req.params;
        const { raza, categoria_id,genero_id, nombre, id_vacuna, descripcion}= req.body;

        const foto=req.file.originalname
        const [actualizar]= await Conexion.query("update mascotas set raza=?,categoria_id=? ,foto=?, genero_id=?, nombre_mas=?, id_vacuna=?, descripcion=? where id=?",[raza,categoria_id,foto,genero_id,nombre, id_vacuna, descripcion,id]);

        if (actualizar.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se actualizo con exito"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se actualizo la mascota "
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "message":error
        })
    }
}

export const eliminar_pets= async(req,res)=>{
    try {
        const {id}= req.params
        const [ eliminar]=await Conexion.query("delete from mascotas where id=?",[id])

        if (eliminar.affectedRows>0) {
            res.status(200).json({
                "message":"se elimino con exito"
            })
        }else{
            res.status(404).json({
                "mesage":"no se elimino"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}

export const listar_mascota= async(req, res)=>{
    try{
const{id}=req.params
        const[mostrar]= await Conexion.query("select*from mascotas where id=?",[id]);

        if (mostrar.length>0) {

            res.status(200).json({
                "MENSAJE":mostrar
            })
        }else{
            res.status(404).json({
                "MENSAJE":"no hay registro de  mascotas"
            })
        }
    }catch(error){
        res.status(500).json({
            "MENSAJE":error
        })
    }
}




export const actualizar_pets_ADOP = async(req, res)=>{
    try {
        const{id}= req.params;
        const [actualizar]= await Conexion.query("update mascotas set estado='Adoptado' where id=?",[id]);

        if (actualizar.affectedRows>0) {
            res.status(200).json({
                "mensaje":"Paso a estar adoptado"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se actualizo la mascota "
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "message":error
        })
    }
}