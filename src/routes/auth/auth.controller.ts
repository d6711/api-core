import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashingService } from 'src/shared/services/hashing.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body)
  }
}
