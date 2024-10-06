import { Conexion } from "../database/conexion.js";
import { encrypter } from "./encrypter.js";
import multer from "multer"

const storage = multer.diskStorage({
    destination:function(req, file, cb)  {
            cb(null, './public/img')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload= multer({storage:storage})

export const saveimg=upload.single('foto')


export const listar_user= async(req,res)=>{
    try {
        
       const [consulta]= await Conexion.query("select*from usuarios where tipo in ('SuperUsuario','Administrador') ");

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

        const{nombre,email,password,tipo, direccion, telefono, documento,tipo_de_documento}=req.body;
        const foto=req.file.originalname;


        const clave =  await encrypter(password)

        const [correoexiste]=  await Conexion.query("select email from usuarios where email=?",[email])
        const [identificacionex]=  await Conexion.query("select documento from usuarios  where documento=?",[documento])
        
        if(correoexiste.length>0 || identificacionex.length>0){
           return res.status(404).json({
                "mensaje":"el correo o identificacion ya existe en nuestra base de datos"
            })
        }

        const [crear]= await Conexion.query("insert into usuarios(nombre,email,password,tipo,foto, direccion, telefono,documento, tipo_de_documento)values(?,?,?,?,?,?,?,?,?)",[nombre,email,clave,tipo,foto, direccion,telefono,documento,tipo_de_documento])

        if (crear.affectedRows>0) {
           return res.status(200).json({
                "mensaje":"se creo con exito"
            })
        }else{
           return res.status(404).json({
                "mensaje":"no se pudo crear el usurio"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
                "mensaje":error
        })
    }
}

export const actualizar_user = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password, tipo, direccion, telefono, documento, tipo_de_documento } = req.body;

       
        const [oldUser] = await Conexion.query("SELECT * FROM usuarios WHERE id = ?", [id]);

        if (oldUser.length === 0) {
            return res.status(404).json({
                "mensaje": "Usuario no encontrado"
            });
        }

        // Obtiene la foto solo si se proporciona
        const foto = req.file ? req.file.originalname : oldUser[0].foto;

        // Verifica si se debe encriptar la nueva contraseña
        const clave = password ? await encrypter(password) : oldUser[0].password;

        const [actualiza] = await Conexion.query(
            "UPDATE usuarios SET nombre = ?, email = ?, password = ?, tipo = ?, foto = ?, direccion = ?, telefono = ?, documento = ?, tipo_de_documento = ? WHERE id = ?",
            [
                nombre || oldUser[0].nombre,
                email || oldUser[0].email,
                clave || oldUser[0].password,
                tipo || oldUser[0].tipo,
                foto || oldUser[0].foto,
                direccion || oldUser[0].direccion,
                telefono || oldUser[0].telefono,
                documento || oldUser[0].documento,
                tipo_de_documento || oldUser[0].tipo_de_documento,
                id
            ]
        );

        if (actualiza.affectedRows > 0) {
           return res.status(200).json({
                "mensaje": "Se actualizó su perfil con éxito"
            });
        } else {
          return  res.status(404).json({
                "mensaje": "No se pudo actualizar el usuario"
            });
        }
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            "mensaje": error.message
        });
    }
};


export const buscar_user=async(req,res)=>{
    try{
        const {id}=req.params
   
        const [actualiza]= await Conexion.query("select*from usuarios where id=?",[id])

        if (actualiza.length>0) {
            res.status(200).json(actualiza)
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
        const [resultado] = await Conexion.query("SELECT COUNT(*) as total FROM usuarios where tipo='Usuario'");
        if (resultado[0].total > 0) {
            res.status(200).json({ total: resultado[0].total });
           
        } else {
            res.status(404).json({ mensaje: "No se encontraron usuarios" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const contarAdmin = async (req, res) => {
    try {
        const [resultado] = await Conexion.query("SELECT COUNT(*) as total FROM usuarios where tipo='Administrador'");
        if (resultado[0].total > 0) {
            res.status(200).json({ total: resultado[0].total });
           
        } else {
            res.status(404).json({ mensaje: "No se encontraron usuarios" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

export const listar_type_user=async(req,res)=>{
    try{
        const [actualiza]= await Conexion.query("select*from usuarios where tipo='Usuario' or tipo='Administrador'")

        if (actualiza.length>0) {
            res.status(200).json(actualiza)
        }else{
            res.status(404).json({
                "message":"no se pudo encontrar el usurio"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
                "mensaje":error
        })
    }
}

export  const borrar= async(req, res)=>{
    try {
        const {id}=req.params;
        const [borrar]= await Conexion.query("delete from usuarios where id=?",[id]);

        if (borrar.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se borro con exito el usuario"
            })
        } else {
            res.status(404).json({
                "mensaje":"no se borro  el usuario"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
} 

export const listar_users= async(req,res)=>{
    try {
        
       const [consulta]= await Conexion.query("select id, nombre from usuarios where tipo='Usuario'");

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

export const number_superuser= async(req, res)=>{
    try {
        const [number]= await Conexion.query("select telefono  from usuarios where tipo='SuperUsuario'");

        if (number.length>0) {
            res.status(200).json(number)
        }else{
            res.status(404).json({"WARNING":"posiblemente no hay un superusuario"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}