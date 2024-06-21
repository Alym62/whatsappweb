import { Injectable } from "@nestjs/common";
import { Server } from 'socket.io';
import { SocketIo } from "src/adapters/implementations/chat.socket-io";
import { ChatAdapter } from "src/adapters/use-cases/chat.adapter";

@Injectable()
export class ChatService {
    private users: number = 0;
    private chatAdapter: ChatAdapter;

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

    sendMessage(sender: string, message: string): void {
        this.chatAdapter.sendMessage(sender, message);
    }
}