import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private taskService: TaskService,
  ) {}

  private toResponce = ({ name, id, login }: User) => ({ name, id, login });

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    await user.save();
    return this.toResponce(user);
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users.map(this.toResponce);
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User with id - ${id} not found`);
    return this.toResponce(user);
  }

  async findByLogin(login: string) {
    const user = await this.userRepo.findOne({ where: { login: login } });
    if (!user)
      throw new NotFoundException(`User with login - ${login} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const affected = (await this.userRepo.update(id, updateUserDto)).affected;
    if (!affected)
      throw new BadRequestException('To many parameters or id not found');
    return { message: 'Updated', id };
  }

  async remove(id: string) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User with id - ${id} not found`);
    await user.remove();
    await this.taskService.unassignUser(id);
    return this.toResponce(user);
  }
}
