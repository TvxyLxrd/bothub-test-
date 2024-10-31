import { getRepository } from 'typeorm';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (username: string, password: string) => {
  const userRepository = getRepository(User);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({ username, password: hashedPassword });
  await userRepository.save(user);
  return user;
};

export const login = async (username: string, password: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
};