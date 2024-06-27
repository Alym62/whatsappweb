import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './domain/entity/conversation.entity';
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
        host: configService.get('DB_HOST', process.env.DB_HOST),
        port: configService.get<any>('DB_PORT', process.env.DB_PORT),
        username: configService.get('DB_USERNAME', process.env.DB_USERNAME),
        password: configService.get('DB_PASSWORD', process.env.DB_PASSWORD),
        database: configService.get('DB_DATABASE', process.env.DB_DATABASE),
        entities: [User, Message, Conversation],
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
