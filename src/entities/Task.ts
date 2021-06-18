import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    order!: number;

    @Column()
    userId!: number;

    @Column()
    boardId!: number;

    @Column()
    columnId!: number;

}