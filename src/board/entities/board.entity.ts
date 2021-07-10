import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

interface IColumn {
  title: string;
  order: number;
}

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'json' })
  columns!: IColumn;
}
