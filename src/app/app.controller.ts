import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  BasicUserDto,
  basicUserSchema,
} from './module/users/application/dtos/basic-user';
import { ZodValidationPipe } from './pipe/zod-validation-pipe';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthenticatedGuard } from './auth/auth.guard';
import { UserEntity } from './module/users/domain/entities/user.entitiy';
import { Book } from '@prisma/client';
import { BookService } from './module/books/domain/services/book.service';
import { BorrowService } from './module/borrowing/domain/services/borrow.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('library')
@Controller('library')
export class AppController {
  constructor(
    private readonly bookService: BookService,
    private readonly borrowService: BorrowService,
  ) {}
  @Post('login')
  @ApiOperation({ summary: 'Login user based on session' })
  @ApiResponse({ status: 201, description: 'Login successfully' })
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(basicUserSchema))
  async login(@Body() basicUserDto: BasicUserDto, @Res() res): Promise<Object> {
    return res
      .status(201)
      .send({ message: 'Success login', user: basicUserDto.username });
    // return { message: 'Success login', user: basicUserDto.username };
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logout has done' })
  logout(@Req() req, @Res() res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).send({ message: 'Failed to logout' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send({ message: 'Failed to destroy session' });
        }
        // Optional: Redirect or send a response
        return res.status(200).send({ message: 'Logged out successfully' });
      });
    });
  }

  @Get('/')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Data user' })
  @ApiResponse({ status: 200, description: 'Get all data user' })
  async home(@Req() req, @Res() res): Promise<Object> {
    const user = new UserEntity(req.user);
    return res
      .status(200)
      .send({ message: 'success', data: user.getDataUser() });
    // return req.user;
  }

  @Get('books')
  @ApiOperation({ summary: 'All books' })
  @ApiResponse({ status: 200, description: 'List of books' })
  async allBooks(@Res() res): Promise<Object> {
    const books = await this.bookService.all();
    return res.status(200).send({ message: 'success', data: books });
  }

  @Get('book/:id')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Get book by id' })
  @ApiResponse({ status: 200, description: 'List of book' })
  async findBookById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ): Promise<Object> {
    const book = await this.bookService.find(id);
    return res.status(200).send({ message: 'success', data: book });
  }

  @Get('book/borrow/:code')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Borrow book by code' })
  @ApiResponse({ status: 200, description: 'Borrowing has done' })
  async borrowBookById(
    @Param('code') code: string,
    @Req() req,
    @Res() res,
  ): Promise<Book> {
    const user = new UserEntity(req.user);
    const borrowBook = await this.borrowService.borrowBook(code, user);
    return res.status(201).send({ message: 'success', data: borrowBook });
    // return this.b
  }
}
