import { Body, Controller, Delete, Get, Req, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import BookResponse from './dto/book-response';
import * as mongoose from 'mongoose';
import { Query as ExpressQuery } from "express-serve-static-core";
import { AuthGuard } from '@nestjs/passport';




@Controller('books')

export class BookController {

    constructor(private bookService: BookService) { }


    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {

        const books = await this.bookService.findAll(query);

        if (!books) {
            throw new NotFoundException(`No data found`)
        }

        return books;
    }




    @Get(":id")
    async getBook(@Param('id') id: string): Promise<Book> {

        const book = await this.bookService.findById(id);

        if (!book) {
            throw new NotFoundException(`Object with ${id} could not be found`)
        }

        return book;

    }


    @Post('new')
    @UseGuards(AuthGuard())
    async createBook(
        @Body() book: CreateBookDto,
        @Req() req
    ): Promise<Book> {


        return this.bookService.create(book, req.user)
    }


    @Put('edit/:id')
    @UseGuards(AuthGuard())
    async updateBook(@Body() book: UpdateBookDto, @Param('id') id: string, @Req() req): Promise<Book> {

        return this.bookService.updateById(id, book, req.user)
    }


    @Delete('delete/:id')
    @UseGuards(AuthGuard())
    async delete(
        @Param('id') id: string,
        @Req() req
    ): Promise<BookResponse> {

        return this.bookService.deleteById(id, req.user)
    }






}
