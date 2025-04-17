import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ITokenPayload } from "../types/token.type";
import { REQUEST_USER_KEY } from "../constants/auth.constant";

export const ActiveUser = createParamDecorator(
    (field: keyof ITokenPayload | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user: ITokenPayload | undefined = request[REQUEST_USER_KEY]
        return field ? user?.[field] : user
    },
);