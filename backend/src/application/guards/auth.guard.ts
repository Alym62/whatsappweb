import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Socket } from "socket.io";

@Injectable()
export class AuthGuardWs implements CanActivate {
    private readonly logger: Logger = new Logger(AuthGuardWs.name);

    constructor(
        private readonly jwtService: JwtService,
    ) { }

    canActivate(context: ExecutionContext):
        boolean | Promise<boolean> | Observable<boolean> {
        const client: Socket = context.switchToWs().getClient<Socket>();
        const token = client.handshake.query.token;

        return this.decodeUser(token, client);
    }

    private async decodeUser(token: any, client: Socket): Promise<boolean> {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: 'W+jX#P9o2}40%#J#7e[qGZ)Ps1g6A5@>PVSoDIH+ls87zrd(Z$',
            });
            client['user'] = decoded;

            return true;
        } catch (e) {
            this.logger.error(`Ocorreu um erro ao tentar decodificar o token - [${e.message}]`)
            return false;
        }
    }
}