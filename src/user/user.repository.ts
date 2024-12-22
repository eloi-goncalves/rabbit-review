import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import User from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly service: PrismaService) {}

  async findMany() {
    return this.service.user.findMany();
  }

  async findOne(id: number) {
    const user = this.service.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    } 
    return user;
  } 

  async create(user: User) {
    return this.service.user.create({ data: user as any });
  }

  async update(user: User) {
    return this.service.user.update({
      where: { id: user.id },
      data: user as any,
    });
  }

  async delete(id: number) {
    const exists = await this.findOne(id);

    if (!exists) {  
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return this.service.user.delete({
      where: { id },
    });
  }
}
