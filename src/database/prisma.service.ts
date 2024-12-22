import { Global, Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {

  private readonly logger = new Logger(PrismaService.name);
  
  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      this.logger.error(`Error $disconnect ${error}`);
      throw error;
    }
    
  } 

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      this.logger.error(`Error $connect ${error}`);
      throw error;
    }
  }
}
