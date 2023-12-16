import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],

})
export class UsersModule { }
