import { IsNumber, IsOptional, IsString, IsEnum, IsEmpty } from "class-validator"
import { Category } from "../schemas/book.schema"
import { User } from "src/users/schemas/users.schema"




export class UpdateBookDto {
    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsString()
    readonly author: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsOptional()
    @IsNumber()
    readonly price: number

    @IsOptional()
    @IsEnum(Category, { message: "Please select a corresponding category" })
    readonly category: Category

    @IsEmpty({ message: "You must not pass user id " })
    readonly user: User
}