import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
interface UserData {
  name: string;
  [key: string]: unknown;
}

@Injectable()
export class UtilService {
  private readonly logger = new Logger(UtilService.name);

  generateRandomString(length: number): string {
    if (length < 0) {
      throw new Error('Length must be a non-negative integer');
    }

    return crypto
      .randomBytes(Math.ceil(length * 0.75))
      .toString('base64')
      .slice(0, length);
  }

  processDataAndLog(data: string[]): string[] {
    this.logger.debug('Processing data: ', data);
    const processedData = data.map((item: string) => {
      if (typeof item === 'string') {
        return item.toUpperCase();
      } else {
        return 'Not supported type';
      }
    });
    this.logger.debug('Processed Data: ', processedData);
    return processedData;
  }

  /**
   * Calculates the sum of products of a value with indices from 0 to count-1
   * @param value The base value to multiply
   * @param count The number of iterations
   * @returns The sum of products
   */
  calculateProgressiveSum(value: number, count: number): number {
    if (count < 0 || !Number.isInteger(count)) {
      throw new Error('Count must be a non-negative integer');
    }
    if (!Number.isFinite(value)) {
      throw new Error('Value must be a finite number');
    }
    let result = 0;
    for (let i = 0; i < count; i++) {
      result += value * i;
    }
    return result;
  }

  formatDate(date: Date | null | undefined): string {
    if (!date) {
      throw new Error('Date cannot be null or undefined');
    }
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      throw new Error('Invalid date object');
    }
    return date.toISOString();
  }

  async saveToDatabase(data: unknown): Promise<boolean> {
    try {
      this.logger.debug('Saving data to database', { data });
      return true;
    } catch (error) {
      this.logger.error('Failed to save to database', { error, data });
      throw error;
    }
  }

  async fetchDataFromAPI(
    url: string,
  ): Promise<{ status: string; data: unknown }> {
    try {
      if (!url || !url.trim()) {
        throw new Error('Url cannot be empty');
      }
      const response = await Promise.resolve({
        status: 'OK',
        data: 'Some Data',
      });
      return response;
    } catch (error) {
      this.logger.error('API call failed', { error, url });
      throw error;
    }
  }

  processUserData(userData: UserData) {
    if (!userData) {
      throw new Error('User data cannot be null');
    }
    if (typeof userData.name !== 'string') {
      throw new Error('User name must be a string');
    }
    this.logger.debug('Processing user data...');
    return userData.name.toUpperCase();
  }

  filterValidData<T>(data: (T | null | undefined)[]): T[] {
    return data.filter((item): item is T =>
      item !== null && item !== undefined && typeof item === 'string'
        ? item !== ''
        : true,
    );
  }

  calculateDiscountPrice(price: number, discount: number): number {
    if (price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (discount < 0 || discount > 1) {
      throw new Error('Discount must be between 0 and 1');
    }
    return Number((price * (1 - discount)).toFixed(2));
  }

  calculateFinalPrice(price: number, tax: number, discount: number): number {
    if (tax < 0) {
      return 0;
    }

    const discountedPrice = this.calculateDiscountPrice(price, discount);
    return Number((discountedPrice * (1 + tax)).toFixed(2));
  }
}
