import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './lib/public-matedata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(@Request() req): string {
    return this.appService.getHello();
  }
}