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
exports.deletePlat = exports.editPlat = exports.getOnePlat = exports.createPlat = exports.getAllPlatBycategorie = void 0;
const platModel_js_1 = __importDefault(require("../models/platModel.js"));
const express_validator_1 = require("express-validator");
const customError_js_1 = require("../validation/customError.js");
//URL: api/plat/:id      Remplacer :id par l'id de la categorie dont on veux recupérer la plats
//TYPE: GET
//REPONSE: json contenant tous les plats de ma categorie
function getAllPlatBycategorie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const plats = yield platModel_js_1.default.find({ categorie_id: req.params.id });
            res.status(200).json(plats);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllPlatBycategorie = getAllPlatBycategorie;
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
function createPlat(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty())
            next(new customError_js_1.CustomError(result.array()));
        const plat = new platModel_js_1.default({
            categorie_id: req.body.categorie_id,
            nom: req.body.nom,
            prix: req.body.prix,
            description: req.body.description,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        try {
            yield plat.save();
            res.status(201).json({ message: 'Objet enregistré !' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createPlat = createPlat;
//URL: api/plat/one/:id
//TYPE: GET
//REPONSE: Json contenant le plat dont l'id est passé en parametres
//Fonction de recupération d'un element unique
function getOnePlat(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const plat = yield platModel_js_1.default.findOne({ _id: req.params.id });
            res.status(200).json(plat);
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.getOnePlat = getOnePlat;
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
function editPlat(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty())
            next(new customError_js_1.CustomError(result.array()));
        const platObject = req.file ? Object.assign(Object.assign({}, JSON.parse(req.body.plat)), { imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }) : Object.assign({}, req.body);
        try {
            const plat = yield platModel_js_1.default.findOne({ _id: req.params.id });
            if (plat && plat.userId != req.auth.userId) {
                next(new Error('Non autorisé!'));
            }
            else {
                yield platModel_js_1.default.updateOne({ _id: req.params.id }, Object.assign(Object.assign({}, platObject), { _id: req.params.id }));
                res.status(200).json({ message: 'Objet modifié!' });
            }
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.editPlat = editPlat;
//URL: api/plat/:id
//TYPE: DELETE
//REPONSE: { "message": "Supprimer" }
//Fonction de suppression
function deletePlat(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield platModel_js_1.default.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: 'Supprimer !'
            });
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.deletePlat = deletePlat;
//# sourceMappingURL=platController.js.map