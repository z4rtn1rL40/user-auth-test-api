import {
  GoneException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.getUserByUsername(username);
    const hash = await bcrypt.hash(pass, 10);
    const isMatch = await bcrypt.compare(user.password, hash);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    if (!newUser) {
      throw new GoneException('Failed to create user');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: newUser.id,
      username: newUser.username,
    });

    return { access_token: accessToken };
  }
}
