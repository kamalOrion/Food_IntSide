import Reservation from '../models/reservationModel.js';
import Plat from '../models/platModel.js';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from '../validation/customError.js'

//URL: api/reservation/
//TYPE: GET

export function getAllReservation(req: Request, res: Response, next: NextFunction) {
  console.log('getAll')
    Reservation.find().then(
      (reservations) => {
        res.status(200).json(reservations);
      }
    ).catch( error => next(error) );
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
export function createReservation(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);  
  if (!result.isEmpty()) next( new CustomError(result.array()) );
  console.log('Create', req.body)
  Plat.findOne({
    _id: req.body.platId
  }).then(
    (plat) => {
      const reservation = new Reservation({
        clientId: req.body.clientId,
        date: req.body.date,
        plat: plat
      });  
      reservation.save();
    }
  ).then(() => {
    res.status(200).json({
        message : "Reservation enregistré avec succès"
    });
  }).catch( error => next(error) );
}

 //URL: api/reservation/:id          Remplacer :id par l'id de la reservation
 //TYPE: DELETE
 //REPONSE: {
  //  message: "Supprimer"
  // }

  //Fonction de suppression
  export function   deleteReservation(req: Request, res: Response, next: NextFunction) {
    console.log('Delete')
    Reservation.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Supprimer!'
        });
      }
    ).catch( error => next(error) );
  }