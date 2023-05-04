"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationValidation = exports.panierValidation = exports.platValidation = exports.categorieValidation = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
const addFileToReqBody = (req, res, next) => {
    console.log(req.body);
    req.body.file = req.file ? true : false;
    next();
};
const imageCategorieValidation = (0, express_validator_1.body)('file').custom((value, { req }) => req.body.file);
const imagePlatValidation = (0, express_validator_1.body)('file').custom((value, { req }) => req.body.file);
exports.userValidation = [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage("L'email est obligatoire")
        .isEmail().withMessage("Le format de l'email est invalide"),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage("Le mot de passe est obligatoire")
        .isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];
exports.categorieValidation = [
    addFileToReqBody,
    (0, express_validator_1.body)('nom')
        .notEmpty().withMessage("Le nom est obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère"),
    imageCategorieValidation.withMessage("L'image de la catégorie est obligatoire")
];
exports.platValidation = [
    addFileToReqBody,
    (0, express_validator_1.body)('categorie_id')
        .notEmpty().withMessage("ID de la catégorie obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère"),
    (0, express_validator_1.body)('nom')
        .notEmpty().withMessage("Le nom est obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère"),
    (0, express_validator_1.body)('prix')
        .notEmpty().withMessage("Le prix est obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère"),
    (0, express_validator_1.body)('description')
        .notEmpty().withMessage("La description est obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère"),
    imagePlatValidation.withMessage("L'image du plat est obligatoire")
];
exports.panierValidation = [
    (0, express_validator_1.body)('platId')
        .notEmpty().withMessage("ID du plat obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère"),
    (0, express_validator_1.body)('clientId')
        .notEmpty().withMessage("id du client obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère")
];
exports.reservationValidation = [
    (0, express_validator_1.body)('clientId')
        .notEmpty().withMessage("ID du client obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère"),
    (0, express_validator_1.body)('date')
        .notEmpty().withMessage("Date de reservation obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère"),
    (0, express_validator_1.body)('platId')
        .notEmpty().withMessage("ID du plat obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère")
];
//# sourceMappingURL=validation.js.map