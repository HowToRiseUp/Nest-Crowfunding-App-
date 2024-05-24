import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  name: string;
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}
