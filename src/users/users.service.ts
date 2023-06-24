import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async findUserBy(options: { where: Partial<User> }) {
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw new NotFoundException('Failed to get user');
    }

    return user;
  }

  async getUserByUsername(username: string) {
    return this.findUserBy({ where: { username } });
  }

  async createUser(createUserDto: CreateUserDto) {
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save({
      ...createUserDto,
      password: encryptedPassword,
    });
  }
}
