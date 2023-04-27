"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: [true, 'Le champs email est obligatoire'], unique: true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'L\'email est invalide'] },
    password: { type: String, required: [true, 'Le champs password est obligatoire'] },
    role: { type: String, require: true },
});
userSchema.plugin(mongoose_unique_validator_1.default, { message: 'Cet email existe déja' });
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=userModel.js.map