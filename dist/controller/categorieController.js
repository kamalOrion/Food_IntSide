"use strict";
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
    console.log('getAll');
    categorieModel_js_1.default.find().then((categories) => {
        res.status(200).json(categories);
    }).catch(error => next(error));
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
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty())
        next(new customError_js_1.CustomError(result.array()));
    const categorieObject = JSON.parse(req.body.categorie);
    const categorie = new categorieModel_js_1.default(Object.assign(Object.assign({}, categorieObject), { userId: req.auth.userId, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }));
    categorie.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }); })
        .catch(error => next(error));
}
exports.createCategorie = createCategorie;
//URL: api/categorie/:id      Remplacer :id par l'id de la categorie
//TYPE: GET
//REPONSE: categorie ayant l'id envoyer
//Fonction de recupération d'un element unique
function getOneCategorie(req, res, next) {
    console.log('getOne');
    categorieModel_js_1.default.findOne({
        _id: req.params.id
    }).then((Categorie) => {
        res.status(200).json(Categorie);
    }).catch(error => next(error));
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
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty())
        next(new customError_js_1.CustomError(result.array()));
    const categorieObject = req.file ? Object.assign(Object.assign({}, JSON.parse(req.body.categorie)), { imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }) : Object.assign({}, req.body);
    categorieModel_js_1.default.findOne({ _id: req.params.id })
        .then((categorie) => {
        console.log(categorie);
        if (categorie.userId != req.auth.userId) {
            next(new Error('Non autorisé'));
            //res.status(401).json({ message : 'Not authorized'});
        }
        else {
            categorieModel_js_1.default.updateOne({ _id: req.params.id }, Object.assign(Object.assign({}, categorieObject), { _id: req.params.id }))
                .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                .catch(error => next(error));
        }
    })
        .catch(error => next(error));
}
exports.editCategorie = editCategorie;
//URL: api/categorie/:id      Remplacer :id par l'id de la categorie
//TYPE: DELETE
//REPONSE: { "message": "Supprimer !" }
//Fonction de suppression
function deleteCategorie(req, res, next) {
    console.log('Delete');
    categorieModel_js_1.default.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: 'Supprimer!'
        });
    }).catch(error => next(error));
}
exports.deleteCategorie = deleteCategorie;
//# sourceMappingURL=categorieController.js.map