// backend/src/routes/authRoutes.js
import express from 'express'
import { login, signup, logout } from '../controllers/authController.controllers.js';
import authMiddleware from '../middleware/authMiddleware.middleware.js'; 
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', authMiddleware, logout);

export default router;
