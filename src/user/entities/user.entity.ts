import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
}
