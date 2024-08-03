import {Conexion} from "../database/conexion.js"

export const crear_adopcion = async (req, res) => {
    try {
       
        const { id_adoptante, edad, id_mascota, estado } = req.body;
        
        // Validar edad
        if (edad <= 18) {
            return res.status(400).json({
                "mensaje": "La edad mínima para adoptar es mayor a 18 años."
            });
        }
        const [crear] = await Conexion.query("INSERT INTO adopciones (id_adoptante, edad, id_mascota, estado) VALUES (?, ?, ?, ?)",[id_adoptante, edad, id_mascota, estado])
        if (crear.affectedRows>0) {
            const [mascota]= await Conexion.query("update mascotas set estado='En Proceso', usuario=? where id=?",[id_adoptante,id_mascota])
            
            if (mascota.affectedRows>0) {
                return   res.status(200).json({
                    "mensaje":"se actualizo la mascota"
                })
            }
            
            return res.status(200).json({
                "mensaje": "Se creó la adopción con éxito"
            });
        } else {
            return res.status(404).json({
                "mensaje": "No se pudo crear la adopción con éxito"
            });
        }
    } catch (error) {
         res.status(500).json({
            "mensaje": error.message || "Error interno del servidor"
        });
    }
};


export const borrar= async(req, res)=>{
    try {
        const {id, id_mascota} =req.params
       
        const [actualizar]= await Conexion.query("update mascotas set estado='Por Adoptar' where id=?",[id_mascota])
        if (actualizar.affectedRows>0) {
            const [borrar]= await Conexion.query("delete from adopciones where id=?",[id]);
            if (borrar.affectedRows) {
                res.status(200).json({
                    "mensaje":"se borro con exito"
                })
            }
        }else{
            res.status(404).json({
                "mensaje":"no  se encontro la adopcion para eliminar"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensajee":error
        })
    }
}

export const listar_adopciones= async(req, res)=>{
    try {
        const [listar]= await Conexion.query("SELECT u.id AS id_usuario, u.email AS correo,  u.nombre AS nombre_usuario, m.id AS id_mascota, a.id AS id_adopcion, m.edad AS edad, m.nombre_mas AS nombre_mascota, a.estado AS estado_adopcion, m.foto AS foto FROM adopciones a JOIN mascotas m ON a.id_mascota = m.id JOIN usuarios u ON a.id_adoptante = u.id where a.estado='Pendiente'")
        
        if (listar.length>0) {
            res.status(200).json(listar)
        }else{
            
            res.status(404).json({
                "mensaje":"algo salio mal"
            })
        }

    } catch (error) {
            res.status(500).json(error)
    }
}

export const actualizar_pet = async (req, res) => {
    try {
        const { id, id_mascota } = req.params;
        
        // Validar edad
    
        const [actualizar] = await Conexion.query("delete from adopciones where id=?",[id]);
        if (actualizar.affectedRows) {
            const [mascota]= await Conexion.query("update mascotas set estado='Adoptado' where id=?",[id_mascota])
            if (mascota.affectedRows>0) {
                return res.status(200).json({
                    "mensaje": "Se actualizo la adopción con éxito"
                });   
            }
        } else {
            return res.status(404).json({
                "mensaje": "No se pudo crear la adopción con éxito"
            });
        }
    } catch (error) {
        return res.status(500).json({
            "mensaje": error.message || "Error interno del servidor"
        });
    }
};


export const contaradopciones = async (req, res) => {
    try {
        const [resultado] = await Conexion.query("SELECT COUNT(*) as total FROM adopciones where estado='Pendiente' ");
        if (resultado[0].total > 0) {
            res.status(200).json({ total: resultado[0].total });
           
        } else {
            res.status(404).json({ mensaje: "No se encontraron adopciones" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};
