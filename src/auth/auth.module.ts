import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { HOUR_IN_SECONDS } from '../constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      // FIXME: use configService instead of hardcoded string
      secret:
        'NEVER USE THIS KINDA VALUES, GENERATE SHA-256 KEY INSTEAD OR ANY OTHER HARD TO CRACK VALUE',
      signOptions: { expiresIn: HOUR_IN_SECONDS },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
