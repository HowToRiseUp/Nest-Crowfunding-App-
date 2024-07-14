import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  _id: string;
  name: string;
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}
