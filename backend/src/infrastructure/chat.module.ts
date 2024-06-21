import { Module } from "@nestjs/common";
import { ChatGateway } from "src/adapters/gateway/chat.gateway";
import { ChatService } from "src/application/services/chat.service";

@Module({
    providers: [ChatGateway, ChatService]
})
export class ChatModule { }