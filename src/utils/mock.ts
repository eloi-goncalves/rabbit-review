import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UtilService {

  private readonly logger = new Logger(UtilService.name);

  generateRandomString(length: number): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  processDataAndLog(data: any) {
    console.log('Processing data: ', data);
    const processedData = data.map((item: string) => item.toUpperCase());
    console.log('Processed Data: ', processedData);
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

  formatDate(date: Date): string {
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

  async fetchDataFromAPI(url: string): Promise<{status: string, data: unknown}> {
    try {
      const response = await Promise.resolve({ status: 'OK', data: 'Some Data' });
      return response;
    } catch (error) {
      this.logger.error('API call failed', { error, url });
      throw error;
    }
  }

  processUserData(userData: any) {
    if (userData == null) {
      throw new Error('User data cannot be null');
    }
    console.log('Processing user data...');
    return userData.name.toUpperCase();
  }

  // Clean code method to filter invalid data
  filterValidData(data: any[]): any[] {
    return data.filter(item => item != null && item !== '');
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
