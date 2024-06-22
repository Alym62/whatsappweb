import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "src/adapters/controllers/auth.controller";
import { AuthGuardWs } from "src/application/guards/auth.guard";
import { AuthService } from "src/application/services/auth.service";
import { UserService } from "src/application/services/user.service";
import { User } from "src/domain/entity/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: 'secret_key',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService, UserService, AuthGuardWs],
    controllers: [AuthController],
    exports: [UserService],
})
export class AuthModule { }