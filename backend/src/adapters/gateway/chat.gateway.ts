import { Logger, UseGuards } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { AuthGuardWs } from "src/application/guards/auth.guard";
import { ChatService } from "src/application/services/chat.service";
import { ConversationService } from "src/application/services/conversation.service";
import { UserService } from "src/application/services/user.service";

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:4200', 'http://127.0.0.1:5501'],
        methods: ['GET', 'POST'],
        credentials: true,
    }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger(ChatGateway.name);

    @WebSocketServer() server: Server = new Server({
        connectionStateRecovery: {}
    });

    constructor(
        private readonly chatService: ChatService,
        private readonly userService: UserService,
        private readonly conversationService: ConversationService,
    ) { }

    afterInit(server: Server): void {
        this.logger.log('WebSocket inicializado...');
        this.chatService.setServer(server);
    }

    @UseGuards(AuthGuardWs)
    handleConnection(client: Socket): void {
        this.logger.log('Cliente conectado no webSocket:', client.id);

        this.chatService.addUser();
        this.server.emit('user', this.chatService.getUserCount());

        // setTimeout(() => {
        //     this.getConversation(client);
        // }, 10000);
    }

    @UseGuards(AuthGuardWs)
    handleDisconnect(client: Socket): void {
        this.logger.log('Cliente desconectado no webSocket:', client.id);
        this.chatService.removeUser();
        this.server.emit('user', this.chatService.getUserCount());
    }

    @SubscribeMessage('message')
    @UseGuards(AuthGuardWs)
    handleMessage(client: Socket, payload: { conversationId: number; message: string }): void {
        const user = client['user'];
        this.chatService.sendMessage(user.username, payload.conversationId, payload.message);
    }

    @SubscribeMessage('openConversation')
    @UseGuards(AuthGuardWs)
    async handleOpenConversation(client: Socket, participantsId: Array<number>): Promise<void> {
        try {
            if (!Array.isArray(participantsId)) throw new Error('participantsId não é um array');

            const participants = await Promise.all(participantsId.map(id => this.userService.fetchIdUsername(id)));
            const conversation = await this.conversationService.createConversation(participants);

            client.emit('conversationOpened', conversation);
        } catch (e) {
            this.logger.error(`Erro ao tentar abrir conversa: ${e.message}`);
            client.emit('error', `Erro ao abrir conversa: ${e.message}`);
        }
    }

    @SubscribeMessage('joinConversation')
    @UseGuards(AuthGuardWs)
    async handleJoinConversation(client: Socket, conversationId: number): Promise<void> {
        try {
            const messages = await this.chatService.fetchMessagesByConversationId(conversationId);
            client.emit('loadMessages', { conversationId, messages });
        } catch (e) {
            this.logger.error(`Erro ao carregas as mensagens da conversa com id: ${conversationId}: ${e.message}`);
            client.emit('error', `Erro ao carregas as mensagens: ${e.message}`);
        }
    }

    // private async getConversation(client: Socket): Promise<void> {
    //     try {
    //         const user = client['user'];

    //         const conversations = await this.conversationService.fetchConversationWithMessages(user.sub);

    //         for (const conversation of conversations) {
    //             const messages = await this.chatService.getMessages(conversation.id);
    //             client.emit('loadMessages', { conversationId: conversation.id, messages });
    //         }
    //     } catch (e) {
    //         this.logger.error(`Erro ao carregar mensagens das conversas do usuário: ${e.message}`)
    //     }
    // }
}