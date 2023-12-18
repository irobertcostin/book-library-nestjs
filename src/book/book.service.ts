import { Injectable, NotFoundException, HttpException, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import BookResponse from './dto/book-response';
import { Query } from "express-serve-static-core";
import { User } from 'src/users/schemas/users.schema';



@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) { }

    async findAll(query: Query): Promise<Book[]> {

        const resPerPage = 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)



        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}

        const books = await this.bookModel.find({ ...keyword }).limit(resPerPage).skip(skip)
        return books

    }


    async create(book: Book, user: User): Promise<Book> {

        const data = Object.assign(book, { user: user._id })
        return await this.bookModel.create(data)

    }



    async findById(id: string): Promise<Book> {



        const book = await this.bookModel.findById(id)

        if (book) {
            return book
        } else {
            throw new HttpException(`No book with ID ${id} found`, HttpStatus.NOT_FOUND)
        }
    }




    async updateById(id: string, book: Book): Promise<Book> {

        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })

    }



    async deleteById(id: string, user: User): Promise<BookResponse> {

        const book = await this.bookModel.findById(id)

        if (!book) {
            throw new HttpException(`No book with ID ${id} found`, HttpStatus.NOT_FOUND)
        }

        if (user._id.toString() !== book.user.toString()) {
            throw new UnauthorizedException("This is not yours to delete")
        }

        const result = await this.bookModel.findByIdAndDelete(id);

        if (result) {

            let response: BookResponse = {
                message: `Book with id ${id} deleted`
            }

            return response;
        }

    }

}
