import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findByLogin(login);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ForbiddenException('Not allowed');

    return user;
  }

  async login(user: User) {
    const payload = { login: user.login, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
