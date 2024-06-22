import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/domain/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async registerUser(user: User): Promise<User> {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);

        return this.userRepository.save(user);
    }

    async fetchByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async fetchIdUsername(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id: id } });
    }
}