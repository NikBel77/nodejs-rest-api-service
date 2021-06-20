import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Board } from './Board';

@Entity()
export class ColumnEnt extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    order!: number;

    @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
    board!: Board;

}