import { Exclude } from "class-transformer"
import { IsString } from "class-validator"
import { IsMatch } from "src/shared/decorators/custom-validator.decorator"

export class LoginUserDto {
    @IsString()
    email: string
    @IsString()
    password: string
}
export class LoginResDto {
    @IsString()
    accessToken: string
    @IsString()
    refreshToken: string
    constructor(partial: Partial<LoginResDto>) {
        Object.assign(this, partial)
    }
}

export class RegisterUserDto extends LoginUserDto {
    @IsString()
    name: string
    @IsString()
    @IsMatch('password')
    confirmPassword: string
}

export class RegisterResDto {
    email: string
    name: string
    createdAt: Date
    updatedAt: Date
    @Exclude()
    password: string;

    constructor(partial: Partial<RegisterResDto>) {
        Object.assign(this, partial);
    }
}

export class RefreshTokenDto {
    @IsString()
    refreshToken: string
}
export class RefreshTokenResDto extends LoginResDto { }