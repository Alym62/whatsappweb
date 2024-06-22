import { Logger, UseGuards } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { AuthGuardWs } from "src/application/guards/auth.guard";
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

    @UseGuards(AuthGuardWs)
    handleConnection(client: Socket): void {
        this.logger.log('Cliente conectado no webSocket:', client.id);
        this.chatService.addUser();
        this.server.emit('user', this.chatService.getUserCount());
    }

    @UseGuards(AuthGuardWs)
    handleDisconnect(client: Socket): void {
        this.logger.log('Cliente desconectado no webSocket:', client.id);
        this.chatService.removeUser();
        this.server.emit('user', this.chatService.getUserCount());
    }

    @SubscribeMessage('message')
    @UseGuards(AuthGuardWs)
    handleMessage(client: Socket, payload: { message: string }): void {
        const user = client['user'];
        this.chatService.sendMessage(user.username, payload.message);
    }
}