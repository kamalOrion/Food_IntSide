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
exports.deletePanier = exports.deleteOnPlatPanier = exports.addtoPanier = exports.getClientPanier = void 0;
const panierModel_js_1 = __importDefault(require("../models/panierModel.js"));
const platModel_js_1 = __importDefault(require("../models/platModel.js"));
const express_validator_1 = require("express-validator");
const customError_js_1 = require("../validation/customError.js");
//URL: api/panier/:id
//TYPE: GET
function getClientPanier(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            infoPanier: null,
            panier: []
        };
        try {
            const infoPanier = yield panierModel_js_1.default.aggregate([
                { $match: { clientId: req.body.clientId } },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$plat.prix" },
                        count: { $sum: 1 }
                    }
                }
            ]);
            if (infoPanier) {
                const paniers = yield panierModel_js_1.default.find({ clientId: req.body.clientId }).populate('plat');
                data.infoPanier = infoPanier;
                data.panier = paniers;
                res.status(200).json(data);
            }
            else
                next(new Error("Echèc de la récupération du panier"));
        }
        catch (error) {
            next(error);
        }
        ;
    });
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
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty())
            next(new customError_js_1.CustomError(result.array()));
        try {
            yield platModel_js_1.default.findOne({ _id: req.body.platId }).then(Plat => {
                const panier = new panierModel_js_1.default({
                    plat: Plat,
                    clientId: req.body.clientId
                });
                panier.save();
            });
            res.status(201).json({ message: 'Objet enregistré !' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.addtoPanier = addtoPanier;
//URL: api/panier/:id      Remplacer :id par l'id de l'élément du panier
//TYPE: DELETE
//REPONSE: {
// message: Supprimer  
//}
//Fonction de suppression
function deleteOnPlatPanier(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield panierModel_js_1.default.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Supprimer !' });
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.deleteOnPlatPanier = deleteOnPlatPanier;
//URL: api/panier/:id          Remplacer :id par l'id du client
//TYPE: DELETE
//REPONSE: {
// message: "supprimmer",
//}
//Fonction de suppression
function deletePanier(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield panierModel_js_1.default.deleteMany({ clientId: req.params.id });
            res.status(200).json({
                message: 'Deleted!'
            });
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.deletePanier = deletePanier;
//# sourceMappingURL=panierController.js.map