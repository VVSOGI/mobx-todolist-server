import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
