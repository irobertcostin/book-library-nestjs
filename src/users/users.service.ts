import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import * as mongoose from "mongoose"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"


@Injectable()
export class UsersService {


    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) { }



    async register(createUserDto): Promise<{ token: string }> {

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
}
