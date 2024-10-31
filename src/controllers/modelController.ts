import { Request, Response } from 'express';
import { generateText } from '../services/modelService';
import { updateBalance } from '../services/billingService';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const generateTextFromModel = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { model, prompt } = req.body;
    if (!model || !prompt) {
      return res.status(400).json({ error: 'Model and prompt are required' });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const userBalance = await updateBalance(userId, model);

    if (userBalance < 0) {
      return res.status(402).json({ error: 'Insufficient balance' });
    }

    const response = await generateText(model, prompt);
    res.status(200).json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};