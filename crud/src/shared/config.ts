import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({
    path: '.env'
})

if (!fs.existsSync(path.resolve('.env'))) {
    console.log(`Không tìm thấy file .env`);
    process.exit(1)
}

class CongigSchema {
    @IsString()
    DATABASE_URL: string
    @IsString()
    ACCESS_TOKEN_SECRET: string
    @IsString()
    ACCESS_TOKEN_EXPIRES_IN: string
    @IsString()
    REFRESH_TOKEN_SECRET: string
    @IsString()
    REFRESH_TOKEN_EXPIRES_IN: string
    @IsString()
    API_KEY_SECRET
}

const configServer = plainToInstance(CongigSchema, process.env)
const error = validateSync(configServer)
if (error.length > 0) {
    console.log(`The values in .env invalid`);
    const errors = error.map((err) => {
        return {
            property: err.property,
            constrants: err.constraints,
            value: err.value
        }
    })
    throw errors;
}
const envConfig = configServer
export default envConfig