import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { REQUEST_USER_KEY } from '../constants/auth.constant';
import envConfig from '../config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const apiKey = request.headers['x-api-key']
        if (apiKey !== envConfig.API_KEY_SECRET) throw new UnauthorizedException('api-key invalid')
        return true
    }
}