import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatGateway } from "src/adapters/gateway/chat.gateway";
import { ChatService } from "src/application/services/chat.service";
import { ConversationService } from "src/application/services/conversation.service";
import { MessageService } from "src/application/services/message.service";
import { UserService } from "src/application/services/user.service";
import { Conversation } from "src/domain/entity/conversation.entity";
import { Message } from "src/domain/entity/message.entity";
import { User } from "src/domain/entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Message, User, Conversation])],
    providers: [ChatGateway, ChatService, JwtService, MessageService, UserService, ConversationService],
})
export class ChatModule { }