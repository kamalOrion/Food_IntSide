import Categorie from '../models/categorieModel.js';
import { Request, Response, NextFunction } from 'express';
import RequestContract from './contratcts/RequestContract.js';
import { validationResult } from 'express-validator';
import { CustomError } from '../validation/customError.js'

//URL: api/categorie/
//TYPE: GET
//REPONSE: objet Json contenant la liste des catégories de plat enrégistré

export async function getAllCategorie(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await Categorie.find();
    categories ? res.status(200).json(categories) : null;
   } catch( error ){
     next(error)
   }
}

//URL: api/categorie/
//TYPE: POST
//DATA: Les données envoyé doivent etre de type Formdata et structurées comme suit: {
// image : fichier image de type jpg/jpeg/png;
// categorie: les données doivent etre de type json formatées comme suit : {
//    "nom": "nom de la categorie"
//  }
//}
//REPONSE: { "message": "Objet enrégistré !" }

//Fonction de creation
export async function createCategorie(req: RequestContract, res: Response, next: NextFunction) {
  const result = validationResult(req);  
  if (!result.isEmpty()) next( new CustomError(result.array()) );
  const categorie = new Categorie({
    nom: req.body.nom,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  try {
    await categorie.save();
    res.status(201).json({message: 'Objet enregistré !'})
  } catch( error ) {
    next(error)
  }
}

//URL: api/categorie/:id      Remplacer :id par l'id de la categorie
//TYPE: GET
//REPONSE: categorie ayant l'id envoyer

//Fonction de recupération d'un element unique
export async function getOneCategorie(req: RequestContract, res: Response, next: NextFunction) {
    try {
      const categorie = await Categorie.findOne({ _id: req.params.id });
      categorie ? res.status(200).json(Categorie) : next(new Error('Echec de la recupération de la categorie'));
    } catch( error) {
      next(error)
    };
}

//URL: api/categorie/:id      Remplacer :id par l'id de la categorie
//TYPE: PUT
//DATA: Les données envoyé doivent etre de type Formdata et structurées comme suit si l'image doit erte modifier : {
// image : fichier image de type jpg/jpeg/png;
// categorie: les données doivent etre de type json formatées comme suit : {
//    "nom": "nom de la categorie"
//  }
//} sinon un simple json conviendra : { "nom": "nom de la categorie" }
//REPONSE: { "message": "Objet modifié !" }

  export async function editCategorie(req: RequestContract, res: Response, next: NextFunction) {
    const result = validationResult(req);  
    if ( ! result.isEmpty()) next( new CustomError(result.array()) );
    try {
      const categorieObject = req.file ? {
        ...JSON.parse(req.body.categorie),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };

      const categorie = await Categorie.findOne({_id: req.params.id});
      if (categorie && (categorie.userId !=  req.auth.userId)) {
        next(new Error('Non autorisé'));
      } else {
        await Categorie.updateOne({ _id: req.params.id}, { ...categorieObject, _id: req.params.id})
        res.status(200).json({message : 'Objet modifié!'})
      }
    } catch( error ) {
      next(error)
    };
 }

//URL: api/categorie/:id      Remplacer :id par l'id de la categorie
//TYPE: DELETE
//REPONSE: { "message": "Supprimer !" }

  //Fonction de suppression
  export async function deleteCategorie(req: Request, res: Response, next: NextFunction) {
   try {
    await Categorie.deleteOne({_id: req.params.id});
    res.status(200).json({ message: 'Supprimer!' });
   }catch( error ) {
    next(error)
   };
  }