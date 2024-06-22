import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Server } from 'socket.io';
import { SocketIo } from "src/adapters/implementations/chat.socket-io";
import { ChatAdapter } from "src/adapters/use-cases/chat.adapter";
import { Message } from "src/domain/entity/message.entity";
import { User } from "src/domain/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChatService {
    private users: number = 0;
    private chatAdapter: ChatAdapter;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
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

    async sendMessage(senderUsername: string, messageContent: string): Promise<void> {
        const sender = await this.userRepository.findOne({ where: { username: senderUsername } });

        if (sender) {
            const message = new Message();
            message.sender = sender;
            message.content = messageContent;
            message.timestamp = new Date();

            await this.messageRepository.save(message);

            this.chatAdapter.sendMessage(sender.username, message.content);
        }
    }
}