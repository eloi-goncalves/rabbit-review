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

  formatDate(date: Date): string {
    return date.toISOString();
  }

  saveToDatabase(data: any) {
    const db = {};  // mock db object
    db['data'] = data; // Direct mutation of a global object is not ideal
    console.log('Data saved to DB:', data);
    return true;
  }

  fetchDataFromAPI(url: string, callback: (data: any) => void) {
    setTimeout(() => {
      const res = { status: 'OK', data: 'Some Data' };
      callback(res);
    }, 1000);
  }

  // Problematic method 5: No proper error handling and logging
  processUserData(userData: any) {
    if (userData == null) {
      throw new Error('User data cannot be null');
    }
    // Simulating some processing with potential errors and no proper logging
    console.log('Processing user data...');
    return userData.name.toUpperCase();
  }

  // Clean code method to filter invalid data
  filterValidData(data: any[]): any[] {
    return data.filter(item => item != null && item !== '');
  }

  // Problematic method 6: No DRY principle, repeated code
  calculateDiscountPrice(price: number, discount: number): number {
    return price - (price * discount);
  }

  calculateFinalPrice(price: number, tax: number, discount: number): number {
    const discountedPrice = this.calculateDiscountPrice(price, discount);
    return discountedPrice + (discountedPrice * tax);
  }
}
