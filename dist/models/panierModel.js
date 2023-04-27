"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const panierSchema = new mongoose_1.Schema({
    plat: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plat', required: true },
    clientId: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Panier', panierSchema);
//# sourceMappingURL=panierModel.js.map