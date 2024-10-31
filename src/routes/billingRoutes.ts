import express from 'express';
import { getUserBalance, updateUserBalance } from '../controllers/billingController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/balance', authMiddleware, getUserBalance);
router.post('/balance', authMiddleware, updateUserBalance);

export default router;