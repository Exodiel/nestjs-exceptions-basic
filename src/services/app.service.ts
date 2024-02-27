import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/core/dto/user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
