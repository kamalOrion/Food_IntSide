"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlat = exports.editPlat = exports.getOnePlat = exports.createPlat = exports.getAllPlatBycategorie = void 0;
const platModel_js_1 = __importDefault(require("../models/platModel.js"));
//URL: api/plat/:id      Remplacer :id par l'id de la categorie dont on veux recupérer la plats
//TYPE: GET
//REPONSE: json contenant tous les plats de ma categorie
function getAllPlatBycategorie(req, res, next) {
    platModel_js_1.default.find({ categorie_id: req.params.id }).then((plats) => {
        res.status(200).json(plats);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
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
    console.log(req.body);
    const platObject = JSON.parse(req.body.plat);
    const plat = new platModel_js_1.default(Object.assign(Object.assign({}, platObject), { userId: req.auth.userId, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }));
    plat.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }); })
        .catch((error) => { res.status(400).json({ error }); });
}
exports.createPlat = createPlat;
//URL: api/plat/one/:id
//TYPE: GET
//REPONSE: Json contenant le plat dont l'id est passé en parametres
//Fonction de recupération d'un element unique
function getOnePlat(req, res, next) {
    console.log('getting plat');
    platModel_js_1.default.findOne({
        _id: req.params.id
    }).then((plat) => {
        res.status(200).json(plat);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
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
    console.log("Edit");
    const platObject = req.file ? Object.assign(Object.assign({}, JSON.parse(req.body.plat)), { imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }) : Object.assign({}, req.body);
    platModel_js_1.default.findOne({ _id: req.params.id })
        .then((plat) => {
        if (plat.userId != req.auth.userId) {
            res.status(401).json({ message: 'Not authorized' });
        }
        else {
            platModel_js_1.default.updateOne({ _id: req.params.id }, Object.assign(Object.assign({}, platObject), { _id: req.params.id }))
                .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                .catch(error => res.status(401).json({ error }));
        }
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
}
exports.editPlat = editPlat;
//URL: api/plat/:id
//TYPE: DELETE
//REPONSE: { "message": "Supprimer" }
//Fonction de suppression
function deletePlat(req, res, next) {
    platModel_js_1.default.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: 'Supprimer !'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
}
exports.deletePlat = deletePlat;
//# sourceMappingURL=platController.js.map