import { IsEmail } from 'class-validator';

export class AuthSignUpDto {
  @IsEmail()
  email: string;

  username: string;
  password: string;
  doubleCheck: string;
}
