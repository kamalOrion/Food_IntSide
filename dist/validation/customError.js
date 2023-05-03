"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message) {
        if (!(typeof message === 'string')) {
            super();
            this.data = message;
        }
        else
            super(message);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=customError.js.map