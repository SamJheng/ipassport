import { ResponseResult } from './../../../models/respone';
import {
  ErrorToMessage,
  UserExistsException,
} from './../../../lib/utils/errors';
import { UsersService } from './../../../users/services/users.service';
import { OAuth2Client } from 'google-auth-library';
import { Public } from './../../../lib/public-matedata';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Query,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { VerifyGoogleCommand } from '../../commands/verify-google';
@Controller('google')
export class GoogleController {
  constructor(private readonly commandBus: CommandBus) {}
  @Get('verify')
  @Public()
  async verifyIdToken(@Query() query): Promise<ResponseResult> {
    const result = await this.commandBus.execute(
      new VerifyGoogleCommand(query.token),
    );
    return result;
  }
}
