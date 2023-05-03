"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = __importDefault(require("../middleware/auth.js"));
const reservationController_js_1 = require("../controller/reservationController.js");
const validation_js_1 = require("../validation/validation.js");
const router = (0, express_1.Router)();
router.get('/', auth_js_1.default, reservationController_js_1.getAllReservation);
router.post('/', auth_js_1.default, validation_js_1.reservationValidation, reservationController_js_1.createReservation);
router.delete('/:id', auth_js_1.default, reservationController_js_1.deleteReservation);
exports.default = router;
//# sourceMappingURL=reservationRoutes.js.map