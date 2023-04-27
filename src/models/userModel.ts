import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
    email : { type : String, required : [ true, 'Le champs email est obligatoire' ], unique : true, 
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'L\'email est invalide'] },
    password : { type : String, required : [ true, 'Le champs password est obligatoire' ] },
    role: { type: String, require: true },
});

userSchema.plugin(uniqueValidator, { message: 'Cet email existe déja' });

export default model('User', userSchema);