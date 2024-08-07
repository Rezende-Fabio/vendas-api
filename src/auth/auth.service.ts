import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { LoginPaylod } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
        const user: UserEntity | undefined = await this.userService
            .getUserByEmail(loginDto.email)
            .catch(() => undefined);

        const isMatch = await compare(loginDto.password, user?.password || '');

        if (!user || !isMatch) {
            throw new NotFoundException(`E-mail or Password incorrect!`);
        }

        return {
            accessToken: await this.jwtService.sign({...new LoginPaylod(user)}),
            user: new ReturnUserDto(user),
        };
    }
}
