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
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty())
            next(new customError_js_1.CustomError(result.array()));
        try {
            const hash = yield (0, bcrypt_1.hash)(req.body.password, 10);
            if (hash) {
                const user = new userModel_js_1.default({
                    email: req.body.email,
                    password: hash,
                    role: req.body.role || 'client'
                });
                user.save();
                res.status(201).json({ message: 'Utilisateur créé !' });
            }
            else
                next(new Error("Echèc de la création de l'utilisateur"));
        }
        catch (error) {
            next(error);
        }
        ;
    });
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
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty())
            next(new customError_js_1.CustomError(result.array()));
        try {
            const user = yield userModel_js_1.default.findOne({ email: req.body.email });
            if (user) {
                const valid = yield (0, bcrypt_1.compare)(req.body.password, user.password);
                valid ? res.status(200).json({
                    userId: user._id,
                    role: user.role,
                    token: jsonwebtoken_1.default.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
                }) : next(new Error('Mot de passe incorrect !'));
            }
            else
                next(new Error('Utilisateur inexistant !'));
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
exports.login = login;
//# sourceMappingURL=userController.js.map