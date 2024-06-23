import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "src/adapters/controllers/auth.controller";
import { UserController } from "src/adapters/controllers/user.controller";
import { AuthGuardWs } from "src/application/guards/auth.guard";
import { AuthService } from "src/application/services/auth.service";
import { ConversationService } from "src/application/services/conversation.service";
import { UserService } from "src/application/services/user.service";
import { JwtStrategy } from "src/application/strategy/jwt.strategy";
import { Conversation } from "src/domain/entity/conversation.entity";
import { User } from "src/domain/entity/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Conversation]),
        PassportModule,
        JwtModule.register({
            secret: 'W+jX#P9o2}40%#J#7e[qGZ)Ps1g6A5@>PVSoDIH+ls87zrd(Z$',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService, UserService, ConversationService, AuthGuardWs, JwtStrategy],
    controllers: [AuthController, UserController],
    exports: [UserService, ConversationService],
})
export class AuthModule { }