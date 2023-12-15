import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import BookResponse from './dto/book-response';

@Controller('books')
export class BookController {

    constructor(private bookService: BookService) { }

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Get(":id")
    async getBook(@Param('id') id: string): Promise<Book> {
        return this.bookService.findById(id);
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
