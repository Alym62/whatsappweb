import { Body, Controller, Get, Logger, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/application/services/user.service";
import { User } from "src/domain/entity/user.entity";

@Controller('api/v1/user')
export class UserController {
    private readonly logger: Logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService,
    ) { }

    @Post()
    async register(@Body() user: User): Promise<User> {
        return this.userService.registerUser(user);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async fetchUsers(@Query('name') name: string, @Req() req): Promise<User[]> {
        if (!name) return [];
        return await this.userService.fetchUsersByUsername(name, req.user.userId);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async fetchUserById(@Req() req): Promise<User | undefined> {
        return await this.userService.fetchIdUsername(req.user.userId);
    }
}