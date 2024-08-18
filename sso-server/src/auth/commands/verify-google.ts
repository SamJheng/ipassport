import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../services/auth.service';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseResult } from '../../models/respone';
import { ErrorToMessage } from '../../lib/utils/errors';
export class VerifyGoogleCommand {
  constructor(public readonly token: string) {}
}
@CommandHandler(VerifyGoogleCommand)
export class VerifyGoogleHandler
  implements ICommandHandler<VerifyGoogleCommand>
{
  client: OAuth2Client;
  CLIENT_ID: string;
  private readonly logger = new Logger(VerifyGoogleHandler.name);
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.CLIENT_ID = this.configService.get<string>('GOOGLE_CLIENT_ID');
    this.client = new OAuth2Client(this.CLIENT_ID);
  }
  async execute(command: VerifyGoogleCommand) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: command.token,
        audience: this.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const uid = ticket.getUserId();
      this.logger.log(uid);
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
      const login = await this.authService.googleSignin({
        uid,
        family_name,
        given_name,
        name,
        email,
        email_verified,
        picture,
        locale,
      });
      const res = new ResponseResult({
        meassge: 'Verify token success!',
        result: login,
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
