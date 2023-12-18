import { Controller, Post, Body, Put, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { EmailInterceptor } from 'src/interceptors/email.interceptor';



@Controller('users')
@UseInterceptors(EmailInterceptor)
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
