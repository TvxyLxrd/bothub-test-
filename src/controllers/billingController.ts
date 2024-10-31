import { Request, Response } from 'express';
import { getBalance, updateBalanceAdmin } from '../services/billingService';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const getUserBalance = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const balance = await getBalance(userId);
    res.status(200).json({ balance });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateUserBalance = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId, amount } = req.body;
    if (!userId || amount === undefined) {
      return res.status(400).json({ error: 'User ID and amount are required' });
    }
    const newBalance = await updateBalanceAdmin(userId, amount);
    res.status(200).json({ balance: newBalance });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};