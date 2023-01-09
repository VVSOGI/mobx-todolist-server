import { IsEmail } from 'class-validator';

export class SignInUsersDto {
  @IsEmail()
  email: string;

  password: string;
}
