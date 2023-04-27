import { Schema, model } from 'mongoose';
import Plat from './platModel.js';

const panierSchema = new Schema({
  plat: { type: Schema.Types.ObjectId, ref: 'Plat', required: true },
  clientId: { type: String, required: true }
});

export default model('Panier', panierSchema);