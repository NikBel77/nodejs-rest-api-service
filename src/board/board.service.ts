import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepo: Repository<Board>,
    private taskService: TaskService,
  ) {}

  private toResponce = (board: Board) => ({
    ...board,
    id: board.id.toString(),
  });

  async create(createBoardDto: CreateBoardDto) {
    try {
      const board = this.boardRepo.create(createBoardDto);
      await board.save();
      return this.toResponce(board);
    } catch {
      throw new BadRequestException('Wrong parameters');
    }
  }

  async findAll() {
    const boards = await this.boardRepo.find();
    return boards.map(this.toResponce);
  }

  async findOne(id: string) {
    const board = await this.boardRepo.findOne(id);
    if (!board) throw new NotFoundException(`Board with id - ${id} not found`);
    return this.toResponce(board);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const res = await this.boardRepo.update(id, updateBoardDto);
    if (!res.affected) throw new BadRequestException('Wrong parameters');
    return { message: 'Updated', id };
  }

  async remove(id: string) {
    const board = await this.boardRepo.findOne(id);
    if (!board) throw new NotFoundException(`Board with id - ${id} not found`);
    await board.remove();
    await this.taskService.removeBoard(id);
    return board;
  }
}
