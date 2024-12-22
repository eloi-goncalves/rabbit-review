import { Body, Controller, Post } from '@nestjs/common';
import User from './user.entity';

@Controller('user')
export class UserController {

  @Post()
  async create(@Body() user: User): Promise<User> {
    return { ...user, id: 1000 };
  }
}
