import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";
import { User } from "./user.entity";

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, (user) => user.conversations)
    @JoinTable()
    participants: User[];

    @OneToMany(() => Message, message => message.conversation)
    messages: Message[];
}