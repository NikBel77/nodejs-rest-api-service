import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() { login, password }: { login: string; password: string },
  ) {
    const user = await this.authService.validateUser(login, password);
    return this.authService.login(user);
  }
}
