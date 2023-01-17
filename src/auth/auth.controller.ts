import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './auth.type';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async checkToken(@GetUser() user: User) {
    if (user) return true;
  }

  @Post('signin')
  async signIn(@Body(ValidationPipe) authSignInDto: AuthSignInDto) {
    const { email, password } = authSignInDto;
    return await this.authService.signIn(email, password);
  }

  @Post('signup')
  async signUp(@Body(ValidationPipe) authSignUpDto: AuthSignUpDto) {
    return await this.authService.signUp(authSignUpDto);
  }
}
