import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { LoginUserDto, RegisterUserDto } from './auth.dto';
import { TokenService } from 'src/shared/services/token.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helpers';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly hashingService: HashingService,
        private readonly tokenService: TokenService
    ) { }
    async register(registerUserDto: RegisterUserDto) {
        try {
            const hashPassword = await this.hashingService.hash(registerUserDto.password)
            const user = await this.prismaService.user.create({
                data: {
                    email: registerUserDto.email,
                    password: hashPassword,
                    name: registerUserDto.name
                }
            })
            return user

        } catch (error) {
            if (isUniqueConstraintPrismaError(error)) {
                throw new ConflictException('Email already exists')
            }
            throw error
        }
    }
    async login(loginUserDto: LoginUserDto) {
        const user = await this.prismaService.user.findUnique({
            where: { email: loginUserDto.email }
        })
        if (!user) throw new UnauthorizedException('Email invalid!')
        const isValidPassword = await this.hashingService.compare(loginUserDto.password, user.password)
        if (!isValidPassword) throw new UnauthorizedException('Password invalid!')
        const tokens = await this.generateTokens({ userId: user.id })
        return tokens

    }
    async generateTokens(payload: { userId: number }) {
        const [accessToken, refreshToken] = await Promise.all([
            this.tokenService.signAccessToken(payload),
            this.tokenService.signRefreshToken(payload)
        ])
        const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
        await this.prismaService.refreshToken.create({
            data: {
                token: refreshToken,
                userId: payload.userId,
                expiresAt: new Date(decodedRefreshToken.exp * 1000)
            }
        })
        return { accessToken, refreshToken }
    }
    async refreshToken(refreshToken: string) {
        try {
            const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)
            await this.prismaService.refreshToken.findUnique({
                where: { token: refreshToken }
            })
            await this.prismaService.refreshToken.delete({
                where: { token: refreshToken }
            })
            return await this.generateTokens({ userId })
        } catch (error) {
            if (isNotFoundPrismaError(error)) {
                throw new UnauthorizedException('Refresh token has been revoked')
            }
            throw new UnauthorizedException('Refresh token invalid')
        }
    }
    async logout(refreshToken: string) {
        try {
            await this.tokenService.verifyRefreshToken(refreshToken)
            await this.prismaService.refreshToken.delete({
                where: { token: refreshToken }
            })
            return { message: 'Logout success!' }
        } catch (error) {
            if (isNotFoundPrismaError(error)) {
                throw new UnauthorizedException('Refresh token has been revoked')
            }
            throw new UnauthorizedException('Refresh token invalid')
        }
    }
}
