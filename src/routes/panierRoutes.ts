import { Router } from 'express';
import auth from "../middleware/auth.js";
import { getClientPanier, addtoPanier, deleteOnPlatPanier, deletePanier } from '../controller/panierController.js';
import { panierValidation } from '../validation/validation.js'

const router = Router();

router.get('/', auth, getClientPanier);
router.post('/', auth, panierValidation, addtoPanier);
router.delete('/:id', auth, deleteOnPlatPanier);
router.delete('/all/:id', auth, deletePanier);

export default router;