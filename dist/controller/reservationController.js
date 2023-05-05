"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reservations = yield reservationModel_js_1.default.find();
            reservations ? res.status(200).json(reservations) : () => { throw new Error('Echèc de la récupération des reservations'); };
        }
        catch (error) {
            next(error);
        }
        ;
    });
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
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty())
            next(new customError_js_1.CustomError(result.array()));
        try {
            const plat = yield platModel_js_1.default.findOne({ _id: req.body.platId });
            if (plat) {
                const reservation = new reservationModel_js_1.default({
                    clientId: req.body.clientId,
                    date: req.body.date,
                    plat: plat
                });
                reservation.save();
                res.status(200).json({ message: "Reservation enregistré avec succès" });
            }
            else
                () => { throw new Error("Echèc de l'enrégistrement de la réservation"); };
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.createReservation = createReservation;
//URL: api/reservation/:id          Remplacer :id par l'id de la reservation
//TYPE: DELETE
//REPONSE: {
//  message: "Supprimer"
// }
//Fonction de suppression
function deleteReservation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            reservationModel_js_1.default.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Supprimer!' });
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.deleteReservation = deleteReservation;
//# sourceMappingURL=reservationController.js.map