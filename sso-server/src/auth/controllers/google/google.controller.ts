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
import { ConfigService } from '@nestjs/config';
import { ExternalType } from 'src/users/models/SocialExternalProviders.entity';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from 'src/auth/models/user.response';
import { AuthService } from '../../services/auth.service';

@Controller('google')
export class GoogleController {
  client: OAuth2Client;
  CLIENT_ID: string;
  private readonly logger = new Logger(GoogleController.name);
  constructor(
    configService: ConfigService,
    private jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {
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
  async verifyIdToken(@Query() query): Promise<UserResponse> {
    try {
      const { token } = query;
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });
      const uid = ticket.getUserId();
      this.logger.log(uid);
      const payload = ticket.getPayload();
      if (!payload) {
        throw new HttpException(
          'No found user from google',
          HttpStatus.NOT_FOUND,
        );
      }
      const {
        family_name,
        given_name,
        name,
        email,
        email_verified,
        picture,
        locale,
      } = payload;
      this.logger.log(payload);
      const res = await this.authService.googleSignin({
        uid,
        family_name,
        given_name,
        name,
        email,
        email_verified,
        picture,
        locale,
      });
      return res;
    } catch (error) {
      throw new HttpException(
        ErrorToMessage(error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
