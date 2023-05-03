"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const express_validator_1 = require("express-validator");
const customError_js_1 = require("../validation/customError.js");
//URL : api/auth/signup
//TYPE: POST
//DATA: {
//     "email": "example@gmail.com",
//     "password": "password"
// }
//Success message: "Utilisateur créé"
function signup(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty())
        next(new customError_js_1.CustomError(result.array()));
    (0, bcrypt_1.hash)(req.body.password, 10)
        .then(hash => {
        const user = new userModel_js_1.default({
            email: req.body.email,
            password: hash,
            role: req.body.role || 'client'
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => next(error));
    })
        .catch(error => next(error));
}
exports.signup = signup;
//URL : api/auth/login
//TYPE: POST
//DATA: {
//     "email": "test@gmail.com",
//     "password": "password"
// }
//Success message: {
//      userid: id de l'utilisateur connecté,
//      role: rôle de l'utilisateur connecté,
//      token: token d'authentification 
// }
function login(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty())
        next(new customError_js_1.CustomError(result.array()));
    userModel_js_1.default.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
            next(new Error('Utilisateur non trouvé !'));
        }
        (0, bcrypt_1.compare)(req.body.password, user.password)
            .then(valid => {
            if (!valid) {
                next(new Error('Mot de passe incorrect !'));
            }
            res.status(200).json({
                userId: user._id,
                role: user.role,
                token: jsonwebtoken_1.default.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
            });
        })
            .catch(error => next(error));
    })
        .catch(error => next(error));
}
exports.login = login;
//# sourceMappingURL=userController.js.map