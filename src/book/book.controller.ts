import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import BookResponse from './dto/book-response';
import * as mongoose from 'mongoose';
import { Query as ExpressQuery } from "express-serve-static-core";


@Controller('books')
export class BookController {

    constructor(private bookService: BookService) { }


    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {

        const books = await this.bookService.findAll(query);

        return books;
    }




    @Get(":id")
    async getBook(@Param('id') id: string): Promise<Book> {

        const book = await this.bookService.findById(id);
        return book;

    }


    @Post('new')

    async createBook(@Body() book: CreateBookDto): Promise<Book> {
        return this.bookService.create(book)
    }


    @Put('edit/:id')

    async updateBook(@Body() book: UpdateBookDto, @Param('id') id: string): Promise<Book> {

        return this.bookService.updateById(id, book)
    }


    @Delete('delete/:id')

    async delete(@Param('id') id: string): Promise<BookResponse> {

        return this.bookService.deleteById(id)
    }






}
