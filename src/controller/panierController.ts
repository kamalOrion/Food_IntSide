import Panier from '../models/panierModel.js';
import Plat from '../models/platModel.js';
import { Request, Response, NextFunction } from 'express';

//URL: api/panier/:id
//TYPE: GET

export function getClientPanier(req: Request, res: Response, next: NextFunction) {
  console.log('getClientPanier', req.body)
  const data: PanierData = {
    infoPanier: null,
    panier: []
  }
  Panier.aggregate([
    { $match: { clientId: req.body.clientId } }, // Filtrez les enregistrements ayant la valeur 1 pour la clé "lol"
    {
      $group: {
        _id: null,
        total: { $sum: "$plat.prix" }, // Calcul de la somme des valeurs de la clé "prix"
        count: { $sum: 1 } // Calcul du nombre total d'enregistrements respectant les conditions
      }
    }
  ])
  .then((infoPanier) => {

    Panier.find({ clientId: req.body.clientId })
    .populate('plat') // remplace l'ID de plat par l'objet correspondant dans la collection "Plat"
    .then((paniers) => {
      data.infoPanier = infoPanier;
      data.panier = paniers;
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
    
  }).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

//URL: api/panier
//TYPE: POST
//DATA: Les données envoyé doivent etre de type JSON comme suit : {
// platId : l'idée du plat a ajouter au panier
// clientId: id du client qui ajout le plat au panier
//} 
//REPONSE: { "message": "Objet enregistré !" }

//Fonction de creation
export function addtoPanier(req: Request, res: Response, next: NextFunction) {
  console.log('AddToPanier', req.body)
  Plat.findOne({ _id: req.body.platId }).then( Plat => {
      const panier = new Panier({
        plat: Plat,
        clientId: req.body.clientId
      });
      panier.save()
    })
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
}

//URL: api/panier/:id      Remplacer :id par l'id de l'élément du panier
//TYPE: DELETE
//REPONSE: {
// message: Supprimer  
//}

//Fonction de suppression
export function deleteOnPlatPanier(req: Request, res: Response, next: NextFunction) {
  console.log('deleteOnPlatPanier')
  Panier.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Supprimer !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

//URL: api/panier/:id          Remplacer :id par l'id du client
//TYPE: DELETE
//REPONSE: {
// message: "supprimmer",
//}

//Fonction de suppression
export function deletePanier(req: Request, res: Response, next: NextFunction) {
  console.log('Delete')
  Panier.deleteMany({clientId: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

export interface PanierData{
  infoPanier: any,
  panier: any[]
}