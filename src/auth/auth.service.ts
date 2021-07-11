import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
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

  async login(user: { login: string; id: string }) {
    const payload = { login: user.login, id: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
