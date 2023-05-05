import Plat from '../models/platModel.js';
import { Request, Response, NextFunction } from 'express';
import RequestContract from './contratcts/RequestContract.js';
import { validationResult } from 'express-validator';
import { CustomError } from '../validation/customError.js'

//URL: api/plat/:id      Remplacer :id par l'id de la categorie dont on veux recupérer la plats
//TYPE: GET
//REPONSE: json contenant tous les plats de ma categorie

export async function getAllPlatBycategorie(req: Request, res: Response, next: NextFunction) {
  try {
    const plats = await Plat.find({ categorie_id: req.params.id })
    res.status(200).json(plats);
  } catch( error ){
    next(error);
  }
}

//URL: api/plat
//TYPE: POST
//DATA: Les données envoyé doivent etre de type Formdata et structurées comme suit : {
// image : fichier image de type jpg/jpeg/png;
// { "categorie_id": id de la categorie dans laquelle le plat doit etre ajouter,
//  "nom": "Plat 1", 
//  "description": "Description du plat 1", 
//  "prix": "1200" }
//}
//REPONSE: { "message": "Objet enregistré !" }

//Fonction de creation
export async function createPlat(req: RequestContract, res: Response, next: NextFunction) {
  const result = validationResult(req);  
  if (!result.isEmpty()) next( new CustomError(result.array()) );
  const plat = new Plat({
    categorie_id: req.body.categorie_id,
    nom: req.body.nom,
    prix: req.body.prix,
    description: req.body.description,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  try {
    await plat.save()
    res.status(201).json({message: 'Objet enregistré !'})
  } catch( error ){
    next(error)
  }
}

//URL: api/plat/one/:id
//TYPE: GET
//REPONSE: Json contenant le plat dont l'id est passé en parametres

//Fonction de recupération d'un element unique
export async function getOnePlat(req: Request, res: Response, next: NextFunction) {
    try {
      const plat = await Plat.findOne({ _id: req.params.id });
      res.status(200).json(plat);
    } catch( error ){
      next(error) 
    };
}

//URL: api/plat/:id      Remplacer :id par l'id du plats
//TYPE: PUT
//DATA: Les données envoyé doivent etre de type Formdata et structurées comme suit : {
// image : fichier image de type jpg/jpeg/png;
// { "categorie_id": id de la categorie du plat,
//  "nom": "Plat 1", 
//  "description": "Description du plat 1", 
//  "prix": "1200" }
//} sinon un simple json conviendra : { "nom": "nom de la categorie" }
//REPONSE: { "message": "Objet modifié !" }

//Fonction d'édition
export async function editPlat(req: RequestContract, res: Response, next: NextFunction) {
  const result = validationResult(req);  
  if (!result.isEmpty()) next( new CustomError(result.array()) );
  const platObject = req.file ? {
      ...JSON.parse(req.body.plat),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  try {
    const plat = await Plat.findOne({_id: req.params.id})
      if (plat && plat.userId != req.auth.userId) {
        next(new Error('Non autorisé!'))
    } else {
        await Plat.updateOne({ _id: req.params.id}, { ...platObject, _id: req.params.id});
        res.status(200).json({message : 'Objet modifié!'})
    }
  } catch( error ){
    next(error) 
  };
}

//URL: api/plat/:id
//TYPE: DELETE
//REPONSE: { "message": "Supprimer" }

  //Fonction de suppression
  export async function deletePlat(req: Request, res: Response, next: NextFunction) {
    try {
      await Plat.deleteOne({_id: req.params.id});
      res.status(200).json({
        message: 'Supprimer !'
      });
    } catch( error ){
      next(error) 
    };
  }