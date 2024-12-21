import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {

  generateRandomString(length: number): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  processDataAndLog(data: any) {
    console.log('Processing data: ', data);
    const processedData = data.map((item: string) => item.toUpperCase());
    console.log('Processed Data: ', processedData);
    return processedData;
  }

  calculateStuff(value: number, count: number) {
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
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date object');
    }
    return date.toISOString();
  }

  saveToDatabase(data: any) {
    const db = {};
    db['data'] = data;
    console.log('Data saved to DB:', data);
    return true;
  }

  fetchDataFromAPI(url: string, callback: (data: any) => void) {
    setTimeout(() => {
      const res = { status: 'OK', data: 'Some Data' };
      callback(res);
    }, 1000);
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
    return price - (price * discount);
  }

  calculateFinalPrice(price: number, tax: number, discount: number): number {
    const discountedPrice = this.calculateDiscountPrice(price, discount);
    return discountedPrice + (discountedPrice * tax);
  }
}
