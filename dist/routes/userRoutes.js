"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_js_1 = require("../controller/userController.js");
const validation_js_1 = require("../validation/validation.js");
const router = (0, express_1.Router)();
router.post('/signup', validation_js_1.userValidation, userController_js_1.signup);
router.post('/login', validation_js_1.userValidation, userController_js_1.login);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map