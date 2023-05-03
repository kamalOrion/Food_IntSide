import { Router } from 'express';
import auth from "../middleware/auth.js";
import { getAllReservation, createReservation, deleteReservation } from '../controller/reservationController.js';
import { reservationValidation } from '../validation/validation.js'

const router = Router();

router.get('/', auth, getAllReservation);
router.post('/', auth, reservationValidation, createReservation);
router.delete('/:id', auth, deleteReservation);

export default router;