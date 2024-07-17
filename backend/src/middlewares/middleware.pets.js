import { check } from "express-validator";

export const validator_create=[
    check("raza","proporcine la raza de su mascota").not() .isString() .isEmpty(),
    check("categoria_id","ingrese el id de la categoria") .not() .isInt() .isEmpty(),
    check("genero_id","ingrese el genero correcto o registre uno").not() .isInt() .isEmpty(),
    check("id_dueño","ingrese el dueño correcto o registre uno").not() .isInt() .isEmpty(),
];
