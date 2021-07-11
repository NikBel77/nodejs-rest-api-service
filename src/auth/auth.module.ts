import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
  property: 'user',
  session: false,
});

@Module({
  imports: [
    UserModule,
    passportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, passportModule],
})
export class AuthModule {}
