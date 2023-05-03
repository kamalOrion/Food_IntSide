"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationValidation = exports.panierValidation = exports.platValidation = exports.categorieValidation = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
// const imageValidation = body('image').custom((value, { req }) => {
//   console.log(req.body, 'ici la valeur')
//   if (!req.files.image) {
//     throw new Error('Aucun fichier n\'a été téléchargé.');
//   }
//   const file = req.files.image;
//   if (!file.type.match(/^image/)) {
//     throw new Error('Le fichier doit être une image.');
//   }
//   if (file.size > 1024 * 1024) {
//     throw new Error('Le fichier ne doit pas dépasser 1 Mo.');
//   }
//   return true;
// });
exports.userValidation = [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage("L'email est obligatoire")
        .isEmail().withMessage("Le format de l'email est invalide"),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage("Le mot de passe est obligatoire")
        .isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];
exports.categorieValidation = [
    (0, express_validator_1.body)('categorie')
        .notEmpty().withMessage("Le nom est obligatoire")
        .isString().withMessage("Le nom doit être une chaine de caratère")
];
exports.platValidation = [
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
        .isString().withMessage("Le nom doit être une chaine de caratère")
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