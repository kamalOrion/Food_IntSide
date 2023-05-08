import User from '../models/userModel.js';
import jsonwebtoken from 'jsonwebtoken';
import { hash as _hash, compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from '../validation/customError.js'

//URL : api/auth/signup
//TYPE: POST
//DATA: {
//     "email": "example@gmail.com",
//     "password": "password"
// }
//Success message: "Utilisateur créé"

export async function signup(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);  
    if (!result.isEmpty()) next( new CustomError(result.array()) );
    try {
      const hash = await _hash(req.body.password, 10);
      if(hash){
        const user = new User({
          email: req.body.email,
          password: hash,
          role: req.body.role || 'client'
        });
        user.save();
        res.status(201).json({ message: 'Utilisateur créé !' })
      } else next(new Error("Echèc de la création de l'utilisateur"));
    } catch( error ){
      next(error)
    };
  }

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

  export async function login(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) next( new CustomError(result.array()) );
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const valid = await compare(req.body.password, user.password);
        valid ?  res.status(200).json({
          userId: user._id,
          role: user.role,
          token: jsonwebtoken.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
          )
        }) : next(new Error('Mot de passe incorrect !'));
      } else throw new Error('Utilisateur inexistant !');
    } catch( error ){ 
      next(error)
    };
  }