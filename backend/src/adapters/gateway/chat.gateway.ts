import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ChatService } from "src/application/services/chat.service";

@WebSocketGateway({
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST'],
        credentials: true,
    }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger(ChatGateway.name);

    @WebSocketServer() server: Server = new Server({
        connectionStateRecovery: {}
    });

    constructor(private readonly chatService: ChatService) { }

    afterInit(server: Server): void {
        this.logger.log('WebSocket inicializado...');
        this.chatService.setServer(server);
    }

    handleConnection(client: Socket): void {
        this.logger.log('Cliente conectado no webSocket:', client.id);
        this.chatService.addUser();
        this.server.emit('user', this.chatService.getUserCount());
    }

    handleDisconnect(client: Socket): void {
        this.logger.log('Cliente desconectado no webSocket:', client.id);
        this.chatService.removeUser();
        this.server.emit('user', this.chatService.getUserCount());
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: { sender: string; message: string }): void {
        this.chatService.sendMessage(payload.sender, payload.message);
    }
}