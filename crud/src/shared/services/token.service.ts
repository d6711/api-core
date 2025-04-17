import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import envConfig from "../config";
import { ITokenPayload } from "../types/token.type";


@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) { }

    signAccessToken(payload: { userId: number }) {
        return this.jwtService.sign(payload, {
            secret: envConfig.ACCESS_TOKEN_SECRET,
            expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN
        })
    }
    signRefreshToken(payload: { userId: number }) {
        return this.jwtService.sign(payload, {
            secret: envConfig.REFRESH_TOKEN_SECRET,
            expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN
        })
    }
    verifyAccessToken(token: string): Promise<ITokenPayload> {
        return this.jwtService.verifyAsync(token, {
            secret: envConfig.ACCESS_TOKEN_SECRET,
        })
    }

    verifyRefreshToken(token: string): Promise<ITokenPayload> {
        return this.jwtService.verifyAsync(token, {
            secret: envConfig.REFRESH_TOKEN_SECRET,
        })
    }

}