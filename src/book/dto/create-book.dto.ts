import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, isEnum } from "class-validator"
import { Category } from "../schemas/book.schema"
import { User } from "src/users/schemas/users.schema"




export class CreateBookDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly author: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsNumber()
    readonly price: number

    @IsNotEmpty()
    @IsEnum(Category, { message: "Please select a corresponding category" })
    readonly category: Category

    @IsEmpty({ message: "You must not pass user id " })
    readonly user: User
}