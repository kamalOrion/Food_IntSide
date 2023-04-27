import User from '../models/userModel.js';
import jsonwebtoken from 'jsonwebtoken';
import { hash as _hash, compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import RequestContract from './contratcts/RequestContract.js';

//URL : api/auth/signup
//TYPE: POST
//DATA: {
//     "email": "example@gmail.com",
//     "password": "password"
// }
//Success message: "Utilisateur créé"

export function signup(req: Request, res: Response, next: NextFunction) {
    console.log(req.body, "kamal")
    _hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
          role: req.body.role || 'client'
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch((error: Error) => res.status(400).json({ error }));
      })
      .catch((error: Error) => res.status(500).json({ error }));
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

  export function login(req: Request, res: Response, next: NextFunction) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        role: user.role,
                        token: jsonwebtoken.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch((error: Error) => res.status(500).json({ error }));
        })
        .catch((error: Error) => res.status(500).json({ error }));
 }