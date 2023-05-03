"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePanier = exports.deleteOnPlatPanier = exports.addtoPanier = exports.getClientPanier = void 0;
const panierModel_js_1 = __importDefault(require("../models/panierModel.js"));
const platModel_js_1 = __importDefault(require("../models/platModel.js"));
const express_validator_1 = require("express-validator");
const customError_js_1 = require("../validation/customError.js");
//URL: api/panier/:id
//TYPE: GET
function getClientPanier(req, res, next) {
    console.log('getClientPanier', req.body);
    const data = {
        infoPanier: null,
        panier: []
    };
    panierModel_js_1.default.aggregate([
        { $match: { clientId: req.body.clientId } },
        {
            $group: {
                _id: null,
                total: { $sum: "$plat.prix" },
                count: { $sum: 1 } // Calcul du nombre total d'enregistrements respectant les conditions
            }
        }
    ])
        .then((infoPanier) => {
        panierModel_js_1.default.find({ clientId: req.body.clientId })
            .populate('plat') // remplace l'ID de plat par l'objet correspondant dans la collection "Plat"
            .then((paniers) => {
            data.infoPanier = infoPanier;
            data.panier = paniers;
            res.status(200).json(data);
        })
            .catch((err) => {
            console.log(err);
        });
    }).catch(error => next(error));
}
exports.getClientPanier = getClientPanier;
//URL: api/panier
//TYPE: POST
//DATA: Les données envoyé doivent etre de type JSON comme suit : {
// platId : l'idée du plat a ajouter au panier
// clientId: id du client qui ajout le plat au panier
//} 
//REPONSE: { "message": "Objet enregistré !" }
//Fonction de creation
function addtoPanier(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty())
        next(new customError_js_1.CustomError(result.array()));
    console.log('AddToPanier', req.body);
    platModel_js_1.default.findOne({ _id: req.body.platId }).then(Plat => {
        const panier = new panierModel_js_1.default({
            plat: Plat,
            clientId: req.body.clientId
        });
        panier.save();
    })
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }); })
        .catch(error => next(error));
}
exports.addtoPanier = addtoPanier;
//URL: api/panier/:id      Remplacer :id par l'id de l'élément du panier
//TYPE: DELETE
//REPONSE: {
// message: Supprimer  
//}
//Fonction de suppression
function deleteOnPlatPanier(req, res, next) {
    console.log('deleteOnPlatPanier');
    panierModel_js_1.default.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: 'Supprimer !'
        });
    }).catch(error => next(error));
}
exports.deleteOnPlatPanier = deleteOnPlatPanier;
//URL: api/panier/:id          Remplacer :id par l'id du client
//TYPE: DELETE
//REPONSE: {
// message: "supprimmer",
//}
//Fonction de suppression
function deletePanier(req, res, next) {
    console.log('Delete');
    panierModel_js_1.default.deleteMany({ clientId: req.params.id }).then(() => {
        res.status(200).json({
            message: 'Deleted!'
        });
    }).catch(error => next(error));
}
exports.deletePanier = deletePanier;
//# sourceMappingURL=panierController.js.map