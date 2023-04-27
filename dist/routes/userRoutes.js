"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_js_1 = require("../controller/userController.js");
const router = (0, express_1.Router)();
router.post('/signup', userController_js_1.signup);
router.post('/login', userController_js_1.login);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map