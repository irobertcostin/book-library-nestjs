import { Injectable, NotFoundException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import BookResponse from './dto/book-response';
import { Query } from "express-serve-static-core";



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


    async create(book: Book): Promise<Book> {
        return await this.bookModel.create(book)

    }



    async findById(id: string): Promise<Book> {

        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('ID not valid')
        }

        const book = await this.bookModel.findById(id)

        if (book) {
            return book
        } else {
            throw new HttpException(`No book with ID ${id} found`, HttpStatus.NOT_FOUND)
        }
    }




    async updateById(id: string, book: Book): Promise<Book> {

        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('ID not valid')
        }

        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })

    }



    async deleteById(id: string): Promise<BookResponse> {


        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('ID not valid')
        }


        const result = await this.bookModel.findByIdAndDelete(id);

        if (result) {
            let response: BookResponse = {
                message: `Book with id ${id} deleted`
            }

            return response;
        } else {
            throw new HttpException(`No book with ID ${id} found`, HttpStatus.NOT_FOUND)
        }

    }

}
