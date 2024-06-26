import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Conversation } from "src/domain/entity/conversation.entity";
import { User } from "src/domain/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,
    ) { }

    async fetchIdConversation(id: number): Promise<Conversation | undefined> {
        return this.conversationRepository.findOne({
            where: { id: id },
            relations: ['participants'],
        });
    }

    async createConversation(participants: User[]): Promise<Conversation> {
        const conversation = new Conversation();
        conversation.participants = participants;

        return this.conversationRepository.save(conversation);
    }

    async saveConversation(conversation: Conversation): Promise<Conversation> {
        return this.conversationRepository.save(conversation);
    }

    async fetchByUserId(userId: number): Promise<Conversation[]> {
        return this.conversationRepository
            .createQueryBuilder('conversation')
            .leftJoinAndSelect('conversation.participants', 'user')
            .where('user.id = :userId', { userId })
            .getMany();
    }

    async fetchConversationByUserId(userId: number): Promise<Conversation[]> {
        return this.conversationRepository
            .createQueryBuilder('conversation')
            .leftJoinAndSelect('conversation.participants', 'user')
            .leftJoinAndSelect('conversation.participants', 'otherUser', 'otherUser.id != :userId', { userId })
            .where('user.id = :userId', { userId })
            .getMany();
    }

    async fetchConversationWithMessages(userId: number): Promise<Conversation[]> {
        return this.conversationRepository
            .createQueryBuilder('conversation')
            .leftJoinAndSelect('conversation.participants', 'participant')
            .leftJoinAndSelect('conversation.messages', 'message')
            .leftJoinAndSelect('message.sender', 'sender')
            .where('participant.id = :userId', { userId })
            .getMany();
    }
}