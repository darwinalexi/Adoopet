import { Conexion } from "../database/conexion.js";
import jwt from"jsonwebtoken"
import { compare } from "./encrypter.js";

export const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const [result] = await Conexion.query('SELECT * FROM usuarios WHERE email=?', [correo]);
        const user = result[0];
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        const passwordMatches = await compare(contrasena, user.password);

        if (!passwordMatches) {
            return res.status(404).json({
                message: 'Credenciales inválidas'
            });
        } else {
            const token = jwt.sign({ userId: user.id }, process.env.AUTO_SECRET, { expiresIn: process.env.AUTO_EXPIRE });
            return res.status(200).json({
                "mensaje":user,
                "token":token
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: error.message
        });
    }
};


export const validarToken = async (req, res, next) => {
    try {
        const token = req.headers['token']
        if (!token) {
            return res.status(404).json({
                "mensaje": "El token es requerido"
            })
        } else {
            jwt.verify(token, process.env.AUTO_SECRET, (error) => {
                if (error) {
                    return res.status(404).json({
                        "mensaje": "Token incorrecto"
                    })
                } else {
                    next()
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}