import { Exclude } from "class-transformer"
import { IsString } from "class-validator"

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