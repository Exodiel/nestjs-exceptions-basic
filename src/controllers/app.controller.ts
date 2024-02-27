/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { CreateUserDto } from 'src/core/dto/user.dto';
import { Response } from 'express';
// import { HttpExceptionFilterFilter } from 'src/core/http-exception-filter/http-exception-filter.filter';

// @UseFilters(HttpExceptionFilterFilter)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 01
  @Get('/error')
  getError() {
    throw new HttpException('HttpException Error', 500)
  }

  // 02
  @Get('/handle-unknown')
  getErrorUnknown() {
    throw new InternalServerErrorException()
  }

  @Post('user')
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const user = this.appService.createUser(createUserDto);
    return response.status(HttpStatus.CREATED).json({ user })
  }
}
