import { Schema, model } from 'mongoose';
import Plat from './platModel.js';

const reservationSchema = new Schema({
  clientId: { type: String, required: true },
  date: { type: String, required: [ true, 'La date de la reservation st obligatoire' ] },   
  plat: { type: Schema.Types.ObjectId, ref: 'Plat', required: true }
});

export default model('Reservation', reservationSchema);

