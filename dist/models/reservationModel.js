"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reservationSchema = new mongoose_1.Schema({
    clientId: { type: String, required: true },
    date: { type: String, required: [true, 'La date de la reservation st obligatoire'] },
    plat: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plat', required: true }
});
exports.default = (0, mongoose_1.model)('Reservation', reservationSchema);
//# sourceMappingURL=reservationModel.js.map