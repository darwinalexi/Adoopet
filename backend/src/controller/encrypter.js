import bcryptjs from "bcryptjs";

export const encrypter= async(password)=>{
    const clave = await bcryptjs.hash(password, 10);
    return clave
}

export const compare = async (contrasena, clave) => {
    return await bcryptjs.compare(contrasena, clave);
};