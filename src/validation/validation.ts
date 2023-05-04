import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import formidable, { Fields, Files } from 'formidable';
import RequestContract from '../controller/contratcts/RequestContract';

const addFileToReqBody = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  req.body.file = req.file ? true : false;
  next();
}

const imageCategorieValidation = body('file').custom((value, { req }) => req.body.file );
const imagePlatValidation = body('file').custom((value, { req }) => req.body.file );

export const userValidation = [
    body('email')
      .notEmpty().withMessage("L'email est obligatoire")
      .isEmail().withMessage("Le format de l'email est invalide"),
    body('password')
      .notEmpty().withMessage("Le mot de passe est obligatoire")
      .isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
]

export const categorieValidation = [
  addFileToReqBody,
  body('nom')
    .notEmpty().withMessage("Le nom est obligatoire")
    .isString().withMessage("Le nom doit être une chaine de caratère"),
  imageCategorieValidation.withMessage("L'image de la catégorie est obligatoire")
]

export const platValidation = [
  addFileToReqBody,
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
    .isString().withMessage("Le nom doit être une chaine de caratère"),
  imagePlatValidation.withMessage("L'image du plat est obligatoire")
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