import { Controller, Post, Body, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';



@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }



    @Post('/register')
    register(@Body() createUserDto: CreateUserDto): Promise<{ token: string }> {
        return this.userService.register(createUserDto)
    }


    @Put('login')
    login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
        return this.userService.login(loginUserDto)
    }



}
