import { Schema, model } from 'mongoose';

const platSchema = new Schema({
  categorie_id: { type: String, required: true },
  nom: { type: String, required: [ true, 'Le nom est obligatoire' ] },
  prix: { type: Number, required: [ true, 'Le prix est obligatoire' ] },
  description: { type: String, required: [ true, 'Le description est obligatoire' ] },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true }
});

export default model('Plat', platSchema);
