import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./conversation.entity";
import { Message } from "./message.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Message, (message) => message.sender)
    messages: Message[];

    @ManyToMany(() => Conversation, (conversation) => conversation.participants)
    conversations: Conversation[];
}