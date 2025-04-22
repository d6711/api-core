import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    cache: true, // tăng hiệu suất
    isGlobal: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }
