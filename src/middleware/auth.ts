import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import RequestContract from '../controller/contratcts/RequestContract.js';

 
export default (req: RequestContract, res: Response, next: NextFunction) => {
   try {
       const token = req.headers.authorization;
       if(token){
        const decodedToken = verify(token, 'RANDOM_TOKEN_SECRET');
        if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('userId')) {
            const userId = decodedToken.userId;
            req.auth = {
                userId: userId
            };
        }
       } else {
        res.status(401).json({ error: "Token non défini." });
      }
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};