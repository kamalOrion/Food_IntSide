"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = __importDefault(require("../middleware/auth.js"));
const panierController_js_1 = require("../controller/panierController.js");
const router = (0, express_1.Router)();
router.get('/', auth_js_1.default, panierController_js_1.getClientPanier);
router.post('/', auth_js_1.default, panierController_js_1.addtoPanier);
router.delete('/:id', auth_js_1.default, panierController_js_1.deleteOnPlatPanier);
router.delete('/all/:id', auth_js_1.default, panierController_js_1.deletePanier);
exports.default = router;
//# sourceMappingURL=panierRoutes.js.map