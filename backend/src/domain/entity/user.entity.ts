import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}