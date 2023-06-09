import { Router } from 'express';
import auth from "../middleware/auth.js";
import multer from '../middleware/multer-config.js';
import { getAllPlatBycategorie, createPlat, getOnePlat, editPlat, deletePlat } from '../controller/platController.js';
import { platValidation } from '../validation/validation.js'

const router = Router();

router.get('/:id', auth, getAllPlatBycategorie);
router.post('/', auth, multer, platValidation, createPlat);
router.get('/one/:id', auth, getOnePlat);
router.put('/:id', auth, multer, platValidation, editPlat);
router.delete('/:id', auth, deletePlat);

export default router;