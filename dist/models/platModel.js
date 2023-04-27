"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const platSchema = new mongoose_1.Schema({
    categorie_id: { type: String, required: true },
    nom: { type: String, required: [true, 'Le nom est obligatoire'] },
    prix: { type: Number, required: [true, 'Le prix est obligatoire'] },
    description: { type: String, required: [true, 'Le description est obligatoire'] },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Plat', platSchema);
//# sourceMappingURL=platModel.js.map