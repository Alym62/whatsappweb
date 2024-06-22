import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "src/domain/entity/message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) { }

    async create(message: Message): Promise<Message> {
        return this.messageRepository.save(message);
    }

    async fetchAllByConversation(conversationId: number): Promise<Message[]> {
        return this.messageRepository.find({
            where: { conversation: { id: conversationId } },
            relations: ['sender', 'conversation'],
        });
    }
}