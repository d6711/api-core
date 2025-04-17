import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResDto, LoginUserDto, RegisterResDto, RegisterUserDto } from './auth.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return new RegisterResDto(await this.authService.register(registerUserDto))
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return new LoginResDto(await this.authService.login(loginUserDto))
  }
}
