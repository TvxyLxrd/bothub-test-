import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  token_cost: number;
}