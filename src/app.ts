import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { ConnectOptions, connect } from 'mongoose';

import userRoutes from './routes/userRoutes.js';
import categorieRoutes from './routes/categorieRoutes.js';
import platRoutes from './routes/platRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import panierRoutes from './routes/panierRoutes.js';
import { CustomError } from './validation/customError.js'

dotenv.config()

const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
} as ConnectOptions;

connect(process.env.DB_URL, options)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);
app.use('/api/categorie', categorieRoutes);
app.use('/api/plat', platRoutes);
app.use('/api/panier', panierRoutes);
app.use('/api/reservation', reservationRoutes);

app.use((req, res, next) => {
  const error = new Error(`La route '${req.url}' est introuvable`);
  next(error);
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(500).json(err.data ? err.data : err.message);
});



export default app;