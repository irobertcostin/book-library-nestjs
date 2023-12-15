import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import BookResponse from './dto/book-response';
import * as mongoose from 'mongoose';

@Controller('books')
export class BookController {

    constructor(private bookService: BookService) { }

    @Get()
    async getAllBooks(): Promise<Book[]> {

        const books = await this.bookService.findAll();

        if (books.length < 1) {
            throw new HttpException('No books available', HttpStatus.NOT_FOUND)
        }

        return this.bookService.findAll();
    }

    @Get(":id")
    async getBook(@Param('id') id: string): Promise<Book> {


        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid book ID', HttpStatus.BAD_REQUEST)
        }

        const book = await this.bookService.findById(id);

        if (book) {
            return book
        } else {
            throw new HttpException(`No book with ID ${id} found`, HttpStatus.NOT_FOUND)
        }


    }

    @Post('new')

    async createBook(@Body() book: CreateBookDto): Promise<Book> {
        return this.bookService.create(book)
    }

    @Put('edit/:id')

    async updateBook(@Body() book: UpdateBookDto, @Param('id') id: string): Promise<Book> {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid book ID', HttpStatus.BAD_REQUEST)
        }

        return this.bookService.updateById(id, book)
    }


    @Delete('delete/:id')

    async delete(@Param('id') id: string): Promise<BookResponse> {


        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid book ID', HttpStatus.BAD_REQUEST)
        }

        return this.bookService.deleteById(id)
    }



}
