import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookSchema } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])]
})
export class BookModule { }
