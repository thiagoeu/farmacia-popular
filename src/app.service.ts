import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const apiDoc = 'http://localhost:3000/api';
    return `Documentação: <a href="${apiDoc}">${apiDoc}</a>`;
  }
}
