import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY, AuthTypeDecoratorPayload } from '../decorators/auth.decorator';
import { AccessTokenGuard } from './access-token.guard';
import { ApiKeyGuard } from './api-key.guard';
import { AuthType, ConditionGuard } from '../constants/auth.constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    private authTypeGuardMap: Record<string, CanActivate>; // chỉ khai báo, chưa gán ở đây

    constructor(
        private readonly reflector: Reflector,
        private readonly accessTokenGuard: AccessTokenGuard,
        private readonly apiKeyGuard: ApiKeyGuard
    ) {
        // Gán giá trị sau khi các dependency đã được inject xong
        this.authTypeGuardMap = {
            [AuthType.Bearer]: this.accessTokenGuard,
            [AuthType.ApiKey]: this.apiKeyGuard,
            [AuthType.None]: { canActivate: () => true },
        };
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const authTypeValue = this.reflector.getAllAndOverride<AuthTypeDecoratorPayload | undefined>(AUTH_TYPE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]) ?? { authTypes: [AuthType.None], options: { condition: ConditionGuard.And } }
        const guards = authTypeValue.authTypes.map((authType) => this.authTypeGuardMap[authType])
        let error = new UnauthorizedException()
        if (authTypeValue.options.condition === ConditionGuard.Or) {
            for (const instance of guards) {
                const canActivate = await Promise.resolve(instance.canActivate(context)).catch((err) => {
                    error = err
                    return false
                })
                if (canActivate) {
                    return true
                }
            }
            throw error
        } else {
            for (const instance of guards) {
                const canActivate = await Promise.resolve(instance.canActivate(context)).catch((err) => {
                    error = err
                    return false
                })
                if (!canActivate) {
                    throw new UnauthorizedException()
                }
            }
            return true
        }
    }
}

