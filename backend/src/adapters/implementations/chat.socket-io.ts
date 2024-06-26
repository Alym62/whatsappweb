import { Server } from 'socket.io';
import { ChatAdapter } from "../use-cases/socket/chat.adapter";

export class SocketIo implements ChatAdapter {
    constructor(private server: Server) { }

    sendMessage(sender: string, message: string): void {
        this.server.emit('message', { sender, message });
    }
}