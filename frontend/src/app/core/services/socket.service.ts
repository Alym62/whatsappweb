import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { Application } from "src/envorinments/envorinment.dev";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket: Socket;
    private readonly apiSockets: string = Application.API_SOCKETS;

    constructor(
        private readonly authService: AuthService,
    ) {
        this.socket = io(`${this.apiSockets}`, {
            query: {
                token: this.authService.getToken(),
            },
        });
    }

    sendMessage(conversationId: number, message: string): void {
        this.socket.emit('message', { conversationId, message });
    }

    openConversation(participantsId: number[]): void {
        this.socket.emit('openConversation', participantsId);
    }

    joinConversation(conversationId: number): void {
        this.socket.emit('joinConversation', conversationId);
    }

    getMessage(): Observable<any> {
        return new Observable((observer) => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
        });
    }

    getUserCount(): Observable<number> {
        return new Observable((observer) => {
            this.socket.on('user', (count) => {
                observer.next(count);
            });
        });
    }

    getConversationOpened(): Observable<any> {
        return new Observable((observer) => {
            this.socket.on('conversationOpened', (conversation) => {
                observer.next(conversation);
            });
        });
    }

    getLoadMessages(): Observable<any> {
        return new Observable((observer) => {
            this.socket.on('loadMessages', ({ conversationId, messages }) => {
                observer.next({ conversationId, messages });
            });
        });
    }

    loadConversation(conversationId: number): void {
        this.socket.emit('loadConversation', conversationId);
    }

    connectSocket(): void {
        this.socket.connect();
    }

    disconnectSocket(): void {
        this.socket.disconnect();
    }
}