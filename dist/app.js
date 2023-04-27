"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const categorieRoutes_js_1 = __importDefault(require("./routes/categorieRoutes.js"));
const platRoutes_js_1 = __importDefault(require("./routes/platRoutes.js"));
const reservationRoutes_js_1 = __importDefault(require("./routes/reservationRoutes.js"));
const panierRoutes_js_1 = __importDefault(require("./routes/panierRoutes.js"));
// connect('mongodb+srv://kamal:65Kamal43@cluster0.biunged.mongodb.net/?retryWrites=true&w=majority',
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
(0, mongoose_1.connect)('mongodb://127.0.0.1:27017/food', options)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/api/auth', userRoutes_js_1.default);
app.use('/api/categorie', categorieRoutes_js_1.default);
app.use('/api/plat', platRoutes_js_1.default);
app.use('/api/panier', panierRoutes_js_1.default);
app.use('/api/reservation', reservationRoutes_js_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map