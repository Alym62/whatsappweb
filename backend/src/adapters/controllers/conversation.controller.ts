import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ChatService } from "src/application/services/chat.service";
import { ConversationService } from "src/application/services/conversation.service";
import { Conversation } from "src/domain/entity/conversation.entity";

@Controller('api/v1/conversation')
export class ConversationController {
    constructor(
        private readonly conversationService: ConversationService,
        private readonly chatService: ChatService,
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async fetchAllByUserId(@Req() req): Promise<Conversation[]> {
        return this.conversationService.fetchConversationByUserId(req.user.userId);
    }
}