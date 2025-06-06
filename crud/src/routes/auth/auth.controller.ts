import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResDto, LoginUserDto, LogoutDto, LogoutResDto, RefreshTokenDto, RefreshTokenResDto, RegisterResDto, RegisterUserDto } from './auth.dto';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { ApiKeyGuard } from 'src/shared/guards/api-key.guard';

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
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return new RefreshTokenResDto(await this.authService.refreshToken(refreshTokenDto.refreshToken))
  }
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    return new LogoutResDto(await this.authService.logout(logoutDto.refreshToken))
  }
}
