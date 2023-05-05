import Reservation from '../models/reservationModel.js';
import Plat from '../models/platModel.js';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from '../validation/customError.js'

//URL: api/reservation/
//TYPE: GET

export async function getAllReservation(req: Request, res: Response, next: NextFunction) {
  try {
    const reservations = await Reservation.find();
    reservations ? res.status(200).json(reservations) : next(new Error('Echèc de la récupération des reservations'));
  } catch( error ){
    next(error) 
  };
}

//URL: api/reservation
//TYPE: POST
//DATA: {
//  clientId: l'id du client
//  date: la date reservé
//  platId: le plat reserver
//}
//REPONSE: {
// message : "Reservation enregistré avec succès"
//  }

//Fonction de creation
export async function createReservation(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);  
  if (!result.isEmpty()) next( new CustomError(result.array()) );

  try{
    const plat = await Plat.findOne({ _id: req.body.platId });
    if(plat){
      const reservation = new Reservation({
        clientId: req.body.clientId,
        date: req.body.date,
        plat: plat
      });  
      reservation.save();
      res.status(200).json({ message : "Reservation enregistré avec succès" });
    } else next(new Error("Echèc de l'enrégistrement de la réservation"));
  } catch( error ){
    next(error)
  };
}

 //URL: api/reservation/:id          Remplacer :id par l'id de la reservation
 //TYPE: DELETE
 //REPONSE: {
  //  message: "Supprimer"
  // }

  //Fonction de suppression
  export async function deleteReservation(req: Request, res: Response, next: NextFunction) {
    try {
      Reservation.deleteOne({_id: req.params.id});
      res.status(200).json({ message: 'Supprimer!' });
    } catch( error ){
      next(error);
    };
  }