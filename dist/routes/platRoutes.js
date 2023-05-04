"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = __importDefault(require("../middleware/auth.js"));
const multer_config_js_1 = __importDefault(require("../middleware/multer-config.js"));
const platController_js_1 = require("../controller/platController.js");
const validation_js_1 = require("../validation/validation.js");
const router = (0, express_1.Router)();
router.get('/:id', auth_js_1.default, platController_js_1.getAllPlatBycategorie);
router.post('/', auth_js_1.default, multer_config_js_1.default, validation_js_1.platValidation, platController_js_1.createPlat);
router.get('/one/:id', auth_js_1.default, platController_js_1.getOnePlat);
router.put('/:id', auth_js_1.default, multer_config_js_1.default, validation_js_1.platValidation, platController_js_1.editPlat);
router.delete('/:id', auth_js_1.default, platController_js_1.deletePlat);
exports.default = router;
//# sourceMappingURL=platRoutes.js.map