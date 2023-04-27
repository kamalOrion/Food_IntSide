import { Schema, model } from 'mongoose';

const categorieSchema = new Schema({
  nom: { type: String, required: [ true, 'Le champs nom est obligatoire' ] },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true }
});

export default model('Categorie', categorieSchema);

