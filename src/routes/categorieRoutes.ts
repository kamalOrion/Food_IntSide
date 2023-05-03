import { Router } from 'express';
import auth from "../middleware/auth.js";
import multer from '../middleware/multer-config.js';
import { getAllCategorie, createCategorie, getOneCategorie, editCategorie, deleteCategorie } from '../controller/categorieController.js';
import { categorieValidation } from '../validation/validation.js'

const router = Router();

router.get('/', auth, getAllCategorie);
router.post('/', auth, multer, categorieValidation, createCategorie);
router.get('/:id', auth, getOneCategorie);
router.put('/:id', auth, multer, categorieValidation, editCategorie);
router.delete('/:id', auth, deleteCategorie);

export default router;