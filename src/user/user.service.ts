import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    async getAllUsers(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{
        const saltOrRounds = 10;

        const passwordHashed = await hash(createUserDto.password, saltOrRounds); 

        const user = await this.userRepository.save({
            ...createUserDto,
            password: passwordHashed
        });
        
        return user;
    }
}