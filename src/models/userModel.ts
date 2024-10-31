import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Balance } from './balanceModel';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  balance: number;

  @OneToMany(() => Balance, balance => balance.user)
  balances: Balance[];
}