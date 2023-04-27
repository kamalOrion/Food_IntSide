import { Router } from 'express';
import auth from "../middleware/auth.js";
import multer from '../middleware/multer-config.js';
import { getAllCategorie, createCategorie, getOneCategorie, editCategorie, deleteCategorie } from '../controller/categorieController.js';

const router = Router();

router.get('/', auth, getAllCategorie);
router.post('/', auth, multer, createCategorie);
router.get('/:id', auth, getOneCategorie);
router.put('/:id', auth, multer, editCategorie);
router.delete('/:id', auth, deleteCategorie);

export default router;