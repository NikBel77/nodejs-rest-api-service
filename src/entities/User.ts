import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

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

}