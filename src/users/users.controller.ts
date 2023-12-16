import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';



@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }



    @Post('/register')
    register(@Body() createUserDto: CreateUserDto): Promise<{ token: string }> {
        return this.userService.register(createUserDto)
    }

}
