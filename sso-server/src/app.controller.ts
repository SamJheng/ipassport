import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './lib/public-matedata';
import { Roles } from './auth/models/roles.decorator';
import { Role } from './auth/models/role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(@Request() req): string {
    return this.appService.getHello();
  }
  @Get('admin')
  @Roles(Role.Admin)
  isAdmin(@Request() req): string {
    return 'admin';
  }
}
