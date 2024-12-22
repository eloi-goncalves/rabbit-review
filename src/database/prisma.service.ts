import {
  Global,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
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
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        await this.$connect();
        return;
      } catch (error) {
        this.logger.error('Failed to connect to the database.', {
          error: error.message,
          stack: error.stack,
          attempt: retries + 1,
          maxRetries,
        });
        retries++;

        if (retries === maxRetries) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
      }
    }
  }
}
