import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/application/services/auth.service";
import { UserService } from "src/application/services/user.service";
import { User } from "src/domain/entity/user.entity";

@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('login')
    async login(@Body() req: User): Promise<any> {
        const user = await this.authService.validateUser(req.username, req.password);

        if (user) return this.authService.login(user);

        return { status: 401, message: 'Não autorizado!' };
    }
}