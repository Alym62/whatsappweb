import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './domain/entity/message.entity';
import { User } from './domain/entity/user.entity';
import { AuthModule } from './infrastructure/auth.module';
import { ChatModule } from './infrastructure/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', '127.0.0.1'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'websocket'),
        entities: [User, Message],
        synchronize: true
      }),
    }),
    ChatModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
