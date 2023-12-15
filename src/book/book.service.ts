import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import BookResponse from './dto/book-response';




@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) { }

    async findAll(): Promise<Book[]> {
        return await this.bookModel.find();

    }

    async create(book: Book): Promise<Book> {
        return await this.bookModel.create(book)

    }

    async findById(id: string): Promise<Book> {

        return await this.bookModel.findById(id)

        // if (!book) {
        //     throw new NotFoundException('Book not found')
        // }


        // return book;

        // try {


        // } catch {
        //     throw new NotFoundException('Invalid book ID');
        // }
    }

    async updateById(id: string, book: Book): Promise<Book> {

        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })

        // try {

        //     return await this.bookModel.findByIdAndUpdate(id, book, {
        //         new: true,
        //         runValidators: true
        //     })
        // } catch {
        //     throw new NotFoundException('Invalid book ID');
        // }

    }



    async deleteById(id: string): Promise<BookResponse> {


        try {


            const result = await this.bookModel.findByIdAndDelete(id);

            if (result) {
                let response: BookResponse = {
                    message: `Book with id ${id} deleted`
                }

                return response;
            } else {
                throw new NotFoundException('Invalid book IDd');
            }
        } catch (error) {
            throw new NotFoundException('Invalid book ID');
        }


    }

}
