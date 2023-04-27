import { Router } from 'express';
import auth from "../middleware/auth.js";
import { getClientPanier, addtoPanier, deleteOnPlatPanier, deletePanier } from '../controller/panierController.js';

const router = Router();

router.get('/', auth, getClientPanier);
router.post('/', auth, addtoPanier);
router.delete('/:id', auth, deleteOnPlatPanier);
router.delete('/all/:id', auth, deletePanier);

export default router;