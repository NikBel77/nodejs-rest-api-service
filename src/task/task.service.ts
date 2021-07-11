import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  private toResponce = (task: Task) => ({
    ...task,
    id: task.id.toString(),
  });

  async create(createTaskDto: CreateTaskDto, boardId: string) {
    try {
      const taskDto = { ...createTaskDto, boardId };
      const task = this.taskRepo.create(taskDto);
      await task.save();
      return this.toResponce(task);
    } catch {
      throw new BadRequestException('Bad Request');
    }
  }

  async findAll() {
    const tasks = await this.taskRepo.find();
    return tasks.map(this.toResponce);
  }

  async findOne(id: string) {
    const task = await this.taskRepo.findOne(id);
    if (!task) throw new NotFoundException(`Task with id - ${id} not found`);
    return this.toResponce(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const affected = (await this.taskRepo.update(id, updateTaskDto)).affected;
    if (!affected)
      throw new BadRequestException('To many parameters or id not found');
    return { message: 'Updated', id };
  }

  async remove(id: string) {
    const task = await this.taskRepo.findOne(id);
    if (!task) throw new NotFoundException(`Task with id - ${id} not found`);
    await task.remove();
    return task;
  }

  async removeBoard(boardId: string) {
    // const tasks = await this.taskRepo.find({ where: { boardId: boardId } });
    // tasks.forEach(async (task) => await task.remove());
    await this.taskRepo.delete({ boardId });
  }

  async unassignUser(userId: string) {
    // const tasks = await this.taskRepo.find({ where: { userId: userId } });
    await this.taskRepo.update({ userId }, { userId: null });
  }
}
