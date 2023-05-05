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
exports.deleteCategorie = exports.editCategorie = exports.getOneCategorie = exports.createCategorie = exports.getAllCategorie = void 0;
const categorieModel_js_1 = __importDefault(require("../models/categorieModel.js"));
const express_validator_1 = require("express-validator");
const customError_js_1 = require("../validation/customError.js");
//URL: api/categorie/
//TYPE: GET
//REPONSE: objet Json contenant la liste des catégories de plat enrégistré
function getAllCategorie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield categorieModel_js_1.default.find();
            categories ? res.status(200).json(categories) : null;
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllCategorie = getAllCategorie;
//URL: api/categorie/
//TYPE: POST
//DATA: Les données envoyé doivent etre de type Formdata et structurées comme suit: {
// image : fichier image de type jpg/jpeg/png;
// categorie: les données doivent etre de type json formatées comme suit : {
//    "nom": "nom de la categorie"
//  }
//}
//REPONSE: { "message": "Objet enrégistré !" }
//Fonction de creation
function createCategorie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty())
            next(new customError_js_1.CustomError(result.array()));
        const categorie = new categorieModel_js_1.default({
            nom: req.body.nom,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        try {
            yield categorie.save();
            res.status(201).json({ message: 'Objet enregistré !' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createCategorie = createCategorie;
//URL: api/categorie/:id      Remplacer :id par l'id de la categorie
//TYPE: GET
//REPONSE: categorie ayant l'id envoyer
//Fonction de recupération d'un element unique
function getOneCategorie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categorie = yield categorieModel_js_1.default.findOne({ _id: req.params.id });
            categorie ? res.status(200).json(categorieModel_js_1.default) : next(new Error('Echec de la recupération de la categorie'));
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.getOneCategorie = getOneCategorie;
//URL: api/categorie/:id      Remplacer :id par l'id de la categorie
//TYPE: PUT
//DATA: Les données envoyé doivent etre de type Formdata et structurées comme suit si l'image doit erte modifier : {
// image : fichier image de type jpg/jpeg/png;
// categorie: les données doivent etre de type json formatées comme suit : {
//    "nom": "nom de la categorie"
//  }
//} sinon un simple json conviendra : { "nom": "nom de la categorie" }
//REPONSE: { "message": "Objet modifié !" }
function editCategorie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty())
            next(new customError_js_1.CustomError(result.array()));
        try {
            const categorieObject = req.file ? Object.assign(Object.assign({}, JSON.parse(req.body.categorie)), { imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }) : Object.assign({}, req.body);
            const categorie = yield categorieModel_js_1.default.findOne({ _id: req.params.id });
            if (categorie && (categorie.userId != req.auth.userId)) {
                next(new Error('Non autorisé'));
            }
            else {
                yield categorieModel_js_1.default.updateOne({ _id: req.params.id }, Object.assign(Object.assign({}, categorieObject), { _id: req.params.id }));
                res.status(200).json({ message: 'Objet modifié!' });
            }
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.editCategorie = editCategorie;
//URL: api/categorie/:id      Remplacer :id par l'id de la categorie
//TYPE: DELETE
//REPONSE: { "message": "Supprimer !" }
//Fonction de suppression
function deleteCategorie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield categorieModel_js_1.default.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Supprimer!' });
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.deleteCategorie = deleteCategorie;
//# sourceMappingURL=categorieController.js.map