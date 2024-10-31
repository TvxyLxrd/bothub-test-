import { getRepository } from 'typeorm';
import { User } from '../models/userModel';
import { Model } from '../models/modelModel';

export const getBalance = async (userId: number) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user.balance;
};

export const updateBalance = async (userId: number, modelName: string) => {
  const userRepository = getRepository(User);
  const modelRepository = getRepository(Model);

  const user = await userRepository.findOne(userId);
  const model = await modelRepository.findOne({ where: { name: modelName } });

  if (!user || !model) {
    throw new Error('User or model not found');
  }

  const tokenCost = model.token_cost;
  user.balance -= tokenCost;
  await userRepository.save(user);

  return user.balance;
};

export const updateBalanceAdmin = async (userId: number, amount: number) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.balance += amount;
  await userRepository.save(user);

  return user.balance;
};