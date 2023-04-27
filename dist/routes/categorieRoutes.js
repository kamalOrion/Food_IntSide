"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = __importDefault(require("../middleware/auth.js"));
const multer_config_js_1 = __importDefault(require("../middleware/multer-config.js"));
const categorieController_js_1 = require("../controller/categorieController.js");
const router = (0, express_1.Router)();
router.get('/', auth_js_1.default, categorieController_js_1.getAllCategorie);
router.post('/', auth_js_1.default, multer_config_js_1.default, categorieController_js_1.createCategorie);
router.get('/:id', auth_js_1.default, categorieController_js_1.getOneCategorie);
router.put('/:id', auth_js_1.default, multer_config_js_1.default, categorieController_js_1.editCategorie);
router.delete('/:id', auth_js_1.default, categorieController_js_1.deleteCategorie);
exports.default = router;
//# sourceMappingURL=categorieRoutes.js.map