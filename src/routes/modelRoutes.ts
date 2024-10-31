import express from 'express';
import { generateTextFromModel } from '../controllers/modelController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/generate', authMiddleware, generateTextFromModel);

export default router;