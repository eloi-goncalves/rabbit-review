import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import User from './user.entity';
import { UserRepository } from './user.repository';

@Controller('users')
export class UserController {

  constructor(private readonly repository: UserRepository) {}
  
  @Get()
  async findAll(): Promise<User[]> {
    return this.repository.findMany();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.repository.create(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const userID = Number.parseInt(id);

    if (isNaN(userID)) {
      throw new BadRequestException('Invalid ID');
    }

    const user = await this.repository.findOne(userID);

    if (!user) {
      throw new NotFoundException(`User with ID ${userID} not found`);
    }
    return user;
  }
}
