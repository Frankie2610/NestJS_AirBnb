import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getFood(id, monAn, filter): object {
    return { id, monAn, filter };
  }
}
