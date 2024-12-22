import { Injectable, Param, Patch } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import User from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly service: PrismaService) {}

  async findMany() {
    return this.service.user.findMany();
  }

  async findOne(id: number) {
    return this.service.user.findUnique({
      where: { id },
    });
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
    return this.service.user.delete({
      where: { id },
    });
  }
}
