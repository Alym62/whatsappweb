import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatGateway } from "src/adapters/gateway/chat.gateway";
import { ChatService } from "src/application/services/chat.service";
import { Message } from "src/domain/entity/message.entity";
import { User } from "src/domain/entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Message, User])],
    providers: [ChatGateway, ChatService, JwtService],
})
export class ChatModule { }