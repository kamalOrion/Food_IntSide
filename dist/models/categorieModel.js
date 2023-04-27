"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorieSchema = new mongoose_1.Schema({
    nom: { type: String, required: [true, 'Le champs nom est obligatoire'] },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Categorie', categorieSchema);
//# sourceMappingURL=categorieModel.js.map