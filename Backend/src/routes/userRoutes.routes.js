
import express from 'express';
import  { getAllUsers, editUser } from '../controllers/userController.controllers.js';
import authMiddleware from '../middleware/authMiddleware.middleware.js'
const router = express.Router();

router.get('/users', authMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, editUser);

export default router;
