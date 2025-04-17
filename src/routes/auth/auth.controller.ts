import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResDto, LoginUserDto, RefreshTokenDto, RefreshTokenResDto, RegisterResDto, RegisterUserDto } from './auth.dto';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return new RegisterResDto(await this.authService.register(registerUserDto))
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return new LoginResDto(await this.authService.login(loginUserDto))
  }
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return new RefreshTokenResDto(await this.authService.refreshToken(refreshTokenDto.refreshToken))
  }
}
