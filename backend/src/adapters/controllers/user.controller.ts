import { Controller, Get, Logger, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/application/services/user.service";
import { User } from "src/domain/entity/user.entity";

@Controller('api/v1/user')
export class UserController {
    private readonly logger: Logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async fetchUsers(@Query('name') name: string, @Req() req): Promise<User[]> {
        if (!name) return [];

        this.logger.warn(req.user.userId);
        return await this.userService.fetchUsersByUsername(name, req.user.userId);
    }
}