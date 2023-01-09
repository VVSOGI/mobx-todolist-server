import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignInUsersDto } from './dto/signin-users.dto';
import { SignUpUsersDto } from './dto/signup-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signin')
  async signIn(@Body(ValidationPipe) signInUsersDto: SignInUsersDto) {
    const { email, password } = signInUsersDto;
    return await this.usersService.signIn(email, password);
  }

  @Post('signup')
  async signUp(@Body(ValidationPipe) signUpUsersDto: SignUpUsersDto) {
    return await this.usersService.signUp(signUpUsersDto);
  }
}
