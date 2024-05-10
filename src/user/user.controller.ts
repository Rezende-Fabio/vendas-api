import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUsers()).map(
            (userEntity) => new ReturnUserDto(userEntity)
        );
    }

    @Get('/:userId')
    async getUserByIdUsingRelations(@Param('userId') userId: number): Promise<ReturnUserDto>{
        return new ReturnUserDto(
            await this.userService.getUserByIdUsingRelations(userId)
        );
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUserDto);
    }
}
