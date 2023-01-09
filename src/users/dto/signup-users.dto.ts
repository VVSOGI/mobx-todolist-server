import { IsEmail } from 'class-validator';

export class SignUpUsersDto {
  @IsEmail()
  email: string;

  username: string;
  password: string;
  doubleCheck: string;
}
