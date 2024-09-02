import { Conexion } from "../database/conexion.js";
import  multer from"multer";
import { validationResult } from "express-validator";




export const listar_pets_in_adop= async(req, res)=>{
    try {
        const [listar] = await Conexion.query("SELECT m.id AS id,u.email AS correo, u.telefono AS  celular,   u.nombre AS nombre_usuario, g.nombre As genero,c.nombre AS nombre_categoria, r.nombre_r AS nombre_raza,     m.edad AS edad, m.nombre_mas AS nombre_mascota, m.estado AS estado, c.nombre AS categoria, m.descripcion AS descripcion,m.historial_medico AS historial_medico,m.id_vacuna AS estado_vacuna,  m.foto AS foto,mu.nombre   AS municipio,d.nombre AS nombre_departamento  FROM mascotas m   JOIN categorias c ON m.categoria_id = c.id  JOIN razas r ON m.raza = r.id  JOIN usuarios u ON m.usuario= u.id JOIN municipio mu ON m.municipio = mu.id Join departamento d on m.departamento= d.id    join  genero g on m.genero_id = g.id where m.estado='Adoptado'");

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
        const [listar]= await Conexion.query("SELECT m.id AS id, u.nombre AS nombre_usuario, g.nombre As genero,c.nombre AS nombre_categoria, r.nombre_r AS nombre_raza,  m.categoria_id AS categoria_id, m.departamento AS id_departamento, m.municipio AS id_municipio, u.id AS id_usuario, r.id AS raza_id, g.id AS genero_id,   m.edad AS edad, m.nombre_mas AS nombre_mascota, m.estado AS estado, c.nombre AS categoria, m.descripcion AS descripcion,m.historial_medico AS historial_medico,m.id_vacuna AS estado_vacuna,  m.foto AS foto,mu.nombre   AS municipio,d.nombre AS nombre_departamento  FROM mascotas m   JOIN categorias c ON m.categoria_id = c.id  JOIN razas r ON m.raza = r.id  JOIN usuarios u ON m.usuario= u.id JOIN municipio mu ON m.municipio = mu.id Join departamento d on m.departamento= d.id    join  genero g on m.genero_id = g.id where m.estado='Por Adoptar'");

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


const storage= multer.diskStorage({
    destination:function(req, file, cb ){
        cb(null, './public/img')
    },
    filename:function(req, file, cb ){
        cb(null, file.originalname)
    }
})

const upload= multer({storage:storage})


export const saveimg=upload.array('foto',6)

export const crear_pets = async (req, res) => {
    try {
        const {raza, categoria_id, genero_id, nombre_mas, id_vacuna, descripcion, edad, usuario,historial_medico, municipio,departamento, vacuna}=req.body;
       
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ mensaje: "No se han subido imágenes." });
        }
        // Procesar los archivos
        const fotos = req.files.map(file => file.originalname);
      //separa los nombre de las fotos 
        const fotosString = fotos.join(',');
        const [regiterpets]= await Conexion.query("insert into mascotas(raza, categoria_id,foto,genero_id,nombre_mas, id_vacuna, descripcion, edad, usuario, historial_medico, municipio, departamento,vacunas)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[raza,categoria_id,fotosString,genero_id, nombre_mas, id_vacuna,descripcion, edad, usuario, historial_medico, municipio, departamento, vacuna])       
       if (regiterpets.affectedRows>0) {
        return res.status(200).json({
            "mensaje":"se creo con exito",
            fotos: fotos
        })
        }else{
            res.status(404).json({
                "mensaje":"no se creo con exito"
            })
        }

        // Puedes realizar más operaciones con las fotos aquí

       

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: error.message });
    }
};



export const actualizar_pets = async(req, res)=>{
    try {
        const{id}= req.params;
        const { raza, categoria_id,genero_id, nombre_mas, id_vacuna, descripcion, estado, usuario, historial_medico}= req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ mensaje: "No se han subido imágenes." });
        }
        // Procesar los archivos
        const fotos = req.files.map(file => file.originalname);
      //separa los nombre de las fotos 
        const fotosString = fotos.join(',');
        const [actualizar]= await Conexion.query("update mascotas set raza=?,categoria_id=? ,foto=?, genero_id=?, nombre_mas=?, id_vacuna=?, descripcion=?, estado=?, usuario=?, historial_medico=? where id=?",[raza,categoria_id,fotosString,genero_id,nombre_mas, id_vacuna, descripcion,estado,usuario,historial_medico,id]);

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

            res.status(200).json(mostrar)
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



    export const contarmascotas = async (req, res) => {
        try {
            const [resultado] = await Conexion.query("SELECT COUNT(*) as total FROM mascotas");
            if (resultado[0].total > 0) {
                res.status(200).json({ total: resultado[0].total });
               
            } else {
                res.status(404).json({ mensaje: "No se encontraron  mascotas"});
            }
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    };
