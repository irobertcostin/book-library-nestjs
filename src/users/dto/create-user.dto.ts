import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength, isEnum } from "class-validator"
import { MaritalStatus } from "../schemas/users.schema"
import { Transform } from "class-transformer"



export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly first_name: string

    @IsNotEmpty()
    @IsString()
    readonly last_name: string

    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    readonly username: string

    @IsNotEmpty()
    @IsEmail({}, { message: 'This is not an email' })
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string

    @IsNotEmpty()
    @IsNumber()
    readonly age: number

    @IsNotEmpty()
    @IsString()
    readonly country: string

    @IsNotEmpty()
    @IsEnum(MaritalStatus, { message: "Please select a corresponding status" })
    readonly marital_status: MaritalStatus
}