import { Router } from 'express';
import { signup, login } from '../controller/userController.js';
import { userValidation } from '../validation/validation.js';

const router = Router();

router.post('/signup', userValidation, signup);
router.post('/login', userValidation, login);


export default router;