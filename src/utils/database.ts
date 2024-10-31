import { createConnection } from 'typeorm';
import { User } from '../models/userModel';
import { Model } from '../models/modelModel';
import { Balance } from '../models/balanceModel';

export const connectDatabase = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Model, Balance],
    synchronize: true,
  });
};
