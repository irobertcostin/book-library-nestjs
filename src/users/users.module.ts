import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { EmailInterceptor } from '../interceptors/email.interceptor';



@Module({
  providers: [UsersService, JwtStrategy, EmailInterceptor],
  controllers: [UsersController],
  imports: [

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({

      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_VALIDITY')
          }
        }
      }
    })
  ],
  exports: [JwtStrategy, PassportModule]

})
export class UsersModule { }
