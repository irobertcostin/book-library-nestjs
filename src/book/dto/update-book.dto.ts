import { IsNumber, IsOptional, IsString, IsEnum } from "class-validator"
import { Category } from "../schemas/book.schema"




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
}