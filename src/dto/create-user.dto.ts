import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from '../constants';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(USERNAME_MIN_LENGTH)
  username: string;

  @IsNotEmpty()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
