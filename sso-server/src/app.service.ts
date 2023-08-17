import { AuthorizationService } from './auth/services/authorzation.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly authorizationService: AuthorizationService) {}
  getHello(): string {
    this.logger.log('Hello World!');
    return 'Hello World!';
  }
}
