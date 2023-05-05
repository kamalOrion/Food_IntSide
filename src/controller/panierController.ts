import Panier from '../models/panierModel.js';
import Plat from '../models/platModel.js';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from '../validation/customError.js'

//URL: api/panier/:id
//TYPE: GET

export async function getClientPanier(req: Request, res: Response, next: NextFunction) {
  const data: PanierData = {
    infoPanier: null,
    panier: []
  }
  try {
    const infoPanier = await Panier.aggregate([
      { $match: { clientId: req.body.clientId } }, 
      {
        $group: {
          _id: null,
          total: { $sum: "$plat.prix" },
          count: { $sum: 1 } 
        }
      }
    ]);
    if(infoPanier){
      const paniers = await Panier.find({ clientId: req.body.clientId }).populate('plat');
      data.infoPanier = infoPanier;
      data.panier = paniers;
      res.status(200).json(data);
    } else next(new Error("Echèc de la récupération du panier"));
  } catch( error ){
    next(error)
  };
}

//URL: api/panier
//TYPE: POST
//DATA: Les données envoyé doivent etre de type JSON comme suit : {
// platId : l'idée du plat a ajouter au panier
// clientId: id du client qui ajout le plat au panier
//} 
//REPONSE: { "message": "Objet enregistré !" }

//Fonction de creation
export async function addtoPanier(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);  
  if (!result.isEmpty()) next( new CustomError(result.array()) );
  try {
    await Plat.findOne({ _id: req.body.platId }).then( Plat => {
      const panier = new Panier({
        plat: Plat,
        clientId: req.body.clientId
      });
      panier.save()
    });
    res.status(201).json({message: 'Objet enregistré !'})
  } catch( error ){
    next(error)
  }
}

//URL: api/panier/:id      Remplacer :id par l'id de l'élément du panier
//TYPE: DELETE
//REPONSE: {
// message: Supprimer  
//}

//Fonction de suppression
export async function deleteOnPlatPanier(req: Request, res: Response, next: NextFunction) {
  try{
    await Panier.deleteOne({_id: req.params.id});
    res.status(200).json({  message: 'Supprimer !' });
  } catch( error ){
    next(error)
  };
}

//URL: api/panier/:id          Remplacer :id par l'id du client
//TYPE: DELETE
//REPONSE: {
// message: "supprimmer",
//}

//Fonction de suppression
export async function deletePanier(req: Request, res: Response, next: NextFunction) {
  try {
    await Panier.deleteMany({clientId: req.params.id});
    res.status(200).json({
      message: 'Deleted!'
    });
  } catch( error ){
    next(error)
  };
}

export interface PanierData{
  infoPanier: any,
  panier: any[]
}