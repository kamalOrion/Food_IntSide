"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.createReservation = exports.getAllReservation = void 0;
const reservationModel_js_1 = __importDefault(require("../models/reservationModel.js"));
const platModel_js_1 = __importDefault(require("../models/platModel.js"));
const express_validator_1 = require("express-validator");
const customError_js_1 = require("../validation/customError.js");
//URL: api/reservation/
//TYPE: GET
function getAllReservation(req, res, next) {
    console.log('getAll');
    reservationModel_js_1.default.find().then((reservations) => {
        res.status(200).json(reservations);
    }).catch(error => next(error));
}
exports.getAllReservation = getAllReservation;
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
function createReservation(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty())
        next(new customError_js_1.CustomError(result.array()));
    console.log('Create', req.body);
    platModel_js_1.default.findOne({
        _id: req.body.platId
    }).then((plat) => {
        const reservation = new reservationModel_js_1.default({
            clientId: req.body.clientId,
            date: req.body.date,
            plat: plat
        });
        reservation.save();
    }).then(() => {
        res.status(200).json({
            message: "Reservation enregistré avec succès"
        });
    }).catch(error => next(error));
}
exports.createReservation = createReservation;
//URL: api/reservation/:id          Remplacer :id par l'id de la reservation
//TYPE: DELETE
//REPONSE: {
//  message: "Supprimer"
// }
//Fonction de suppression
function deleteReservation(req, res, next) {
    console.log('Delete');
    reservationModel_js_1.default.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: 'Supprimer!'
        });
    }).catch(error => next(error));
}
exports.deleteReservation = deleteReservation;
//# sourceMappingURL=reservationController.js.map