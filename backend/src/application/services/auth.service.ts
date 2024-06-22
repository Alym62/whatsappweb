import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "src/domain/entity/user.entity";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.fetchByUsername(username);
        const condition = await bcrypt.compare(pass, user.password);

        if (user && condition) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: User): Promise<any> {
        const payload = { username: user.username, sub: user.id };

        return { acess_token: this.jwtService.sign(payload) };
    }
}