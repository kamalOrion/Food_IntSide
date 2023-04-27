"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.default = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decodedToken = (0, jsonwebtoken_1.verify)(token, 'RANDOM_TOKEN_SECRET');
            if (typeof decodedToken === 'object' && decodedToken.hasOwnProperty('userId')) {
                const userId = decodedToken.userId;
                req.auth = {
                    userId: userId
                };
            }
        }
        else {
            res.status(401).json({ error: "Token non défini." });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ error });
    }
};
//# sourceMappingURL=auth.js.map