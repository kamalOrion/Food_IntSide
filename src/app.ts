import express, { Request, Response, NextFunction } from 'express';
import { ConnectOptions, connect } from 'mongoose';

import userRoutes from './routes/userRoutes.js';
import categorieRoutes from './routes/categorieRoutes.js';
import platRoutes from './routes/platRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import panierRoutes from './routes/panierRoutes.js';

// connect('mongodb+srv://kamal:65Kamal43@cluster0.biunged.mongodb.net/?retryWrites=true&w=majority',

const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
} as ConnectOptions;

connect('mongodb://127.0.0.1:27017/food',
  options)
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

export default app;