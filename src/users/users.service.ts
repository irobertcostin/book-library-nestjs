import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import * as mongoose from "mongoose"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';


@Injectable()
export class UsersService {


    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) { }



    async register(createUserDto: CreateUserDto): Promise<{ token: string }> {

        const { first_name, last_name, username, email, password, age, country, marital_status } = createUserDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
            age,
            country,
            marital_status
        })

        const token = this.jwtService.sign({ id: user._id })

        return { token }

    }


    async login(loginDto: LoginUserDto): Promise<{ token: string }> {

        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email })

        if (!user) {
            throw new NotFoundException('Invalid email address')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid password')
        }

        const token = this.jwtService.sign({ id: user._id })

        return { token }

    }


}
