import { Test, TestingModule } from "@nestjs/testing";
import { BookService } from "../book/book.service";
import { BookController } from "src/book/book.controller";
import mongoose, { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { Book, Category } from "../book/schemas/book.schema";
import { User } from "src/users/schemas/users.schema";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { skip } from "node:test";
import { CreateBookDto } from "src/book/dto/create-book.dto";
import { UsersService } from "src/users/users.service";


describe('BookService', () => {

    let bookService: BookService;
    let model: Model<Book>;

    let userService: UsersService;
    let userModel: Model<User>

    const mockUserService = {
        register: jest.fn(),
        login: jest.fn()
    }

    const mockUser = {
        first_name: "Adi",
        last_name: "Stancioiu",
        username: "adiadi",
        email: "ADYY@YAHOO.COM",
        password: "Gigel123",
        age: 35,
        country: "Romania",
        marital_status: "Divorced"
    }



    const mockBookService = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn()
    };


    const mockBook = {
        _id: "657f690959630506bc09e38a",
        title: "Once upon a century",
        description: "Once upon a time, there was a guy searching for a job",
        author: "Titi Dolar",
        price: 129.98,
        category: "Adventure",
        user: "657d8fdab1316a990c84e585"

    }



    beforeEach(async () => {


        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                {
                    provide: getModelToken(Book.name),
                    useValue: mockBookService
                }
            ],
        }).compile();


        bookService = module.get<BookService>(BookService)
        model = module.get<Model<Book>>(getModelToken(Book.name));


    })


    describe("findAll", () => {

        it('should get and return all books', async () => {

            const query = { page: "1", keyword: "test" }

            jest.spyOn(model, "find").mockImplementation(
                () => (
                    {
                        limit: () => ({
                            skip: jest.fn().mockResolvedValue([mockBook])
                        })
                    } as any
                )
            )

            const result = await bookService.findAll(query)

            expect(result).toEqual([mockBook])

            expect(model.find).toHaveBeenCalledWith({
                title: {
                    $regex: "test",
                    $options: 'i'
                }
            })

        })

    })


    describe("findById", () => {

        it("should get and return a book by id ", async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(mockBook)

            const result = await bookService.findById(mockBook._id)

            expect(model.findById).toHaveBeenCalledWith(mockBook._id)

            expect(result).toEqual(mockBook)
        })

        it("should throw NotFoundException if the ID is not found", async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(null)

            await expect(bookService.findById(mockBook._id)).rejects.toThrow(NotFoundException)

            expect(model.findById).toHaveBeenCalledWith(mockBook._id)

        })
    })


    describe("create", () => {

        it("should create and return a book", async () => {
            jest.spyOn(model, 'create').mockImplementationOnce((data: any) => {

                return Promise.resolve(data);
            })

            const newBook = {

                title: "Once upon a century",
                description: "Once upon a time, there was a guy searching for a job",
                author: "Titi Dolar",
                price: 129.98,
                category: "Adventure",

            }

            const result = await bookService.create(newBook as CreateBookDto, mockUser as User)
            expect(result).toEqual(newBook)


        })


    })


    describe("updateById", () => {

        it("should edit and return a book", async () => {

            const updatedBook = { ...mockBook, title: "New title" }

            const userToEdit = {
                email: "consti@yahoo.com",
                password: "Gigel123"
            }


            // jest.spyOn
            // jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedBook);

            // const result = await bookService.updateById(mockBook._id, updatedBook as any, mockUser as any)

        })


    })



})