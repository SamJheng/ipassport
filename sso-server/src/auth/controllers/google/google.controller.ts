import { OAuth2Client } from 'google-auth-library';
import { Public } from './../../../lib/public-matedata';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Query,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('google')
export class GoogleController {
  client: OAuth2Client;
  CLIENT_ID: string;
  constructor(configService: ConfigService) {
    this.CLIENT_ID = configService.get<string>('GOOGLE_CLIENT_ID');
    this.client = new OAuth2Client(this.CLIENT_ID);
  }
  @Get()
  @Public()
  async googleAuth(@Req() req) {
    return 'google';
  }
  @Get('verify')
  @Public()
  async verifyIdToken(@Query() query) {
    const { token } = query;
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const uid = ticket.getUserId();
    return uid;
  }
}
