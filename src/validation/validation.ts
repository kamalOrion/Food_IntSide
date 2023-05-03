import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import formidable, { Fields, Files } from 'formidable';
import RequestContract from '../controller/contratcts/RequestContract';

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

export const userValidation = [
    body('email')
      .notEmpty().withMessage("L'email est obligatoire")
      .isEmail().withMessage("Le format de l'email est invalide"),
    body('password')
      .notEmpty().withMessage("Le mot de passe est obligatoire")
      .isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
]

export const categorieValidation = [
  body('categorie')
    .notEmpty().withMessage("Le nom est obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère")
]

export const platValidation = [
  body('categorie_id')
    .notEmpty().withMessage("ID de la catégorie obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère"),
  body('nom')
    .notEmpty().withMessage("Le nom est obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère"),
  body('prix')
    .notEmpty().withMessage("Le prix est obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère"),
  body('description')
    .notEmpty().withMessage("La description est obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère")
]

export const panierValidation = [
  body('platId')
    .notEmpty().withMessage("ID du plat obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère"),
  body('clientId')
    .notEmpty().withMessage("id du client obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère")
]

export const reservationValidation = [
  body('clientId')
    .notEmpty().withMessage("ID du client obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère"),
  body('date')
    .notEmpty().withMessage("Date de reservation obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère"),
  body('platId')
    .notEmpty().withMessage("ID du plat obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère")
]