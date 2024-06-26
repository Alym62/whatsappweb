import { Injectable } from "@nestjs/common";
import { Server } from 'socket.io';
import { SocketIo } from "src/adapters/implementations/chat.socket-io";
import { ChatAdapter } from "src/adapters/use-cases/socket/chat.adapter";
import { Message } from "src/domain/entity/message.entity";
import { ConversationService } from "./conversation.service";
import { MessageService } from "./message.service";
import { UserService } from "./user.service";

@Injectable()
export class ChatService {
    private users: number = 0;
    private chatAdapter: ChatAdapter;

    constructor(
        private readonly userService: UserService,
        private readonly messageService: MessageService,
        private readonly conversationService: ConversationService,
    ) { }

    setServer(server: Server): void {
        this.chatAdapter = new SocketIo(server);
    }

    addUser(): void {
        this.users++;
    }

    removeUser(): void {
        this.users--;
    }

    getUserCount(): number {
        return this.users;
    }

    async sendMessage(senderUsername: string, conversationId: number, messageContent: string): Promise<void> {
        const sender = await this.userService.fetchByUsername(senderUsername);
        const conversation = await this.conversationService.fetchIdConversation(conversationId);

        if (sender) {
            const message = new Message();
            message.sender = sender;
            message.content = messageContent;
            message.timestamp = new Date();
            message.conversation = conversation

            await this.messageService.create(message);

            this.chatAdapter.sendMessage(sender.username, message.content);
        } else {
            throw new Error('Usuário não encontrado!');
        }
    }

    async getMessages(conversationId: number): Promise<Message[]> {
        return this.messageService.fetchAllByConversation(conversationId);
    }

    async fetchMessagesByConversationId(conversationId: number): Promise<Message[]> {
        return this.messageService.getMessagesByConversationId(conversationId);
    }
}