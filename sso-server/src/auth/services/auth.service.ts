import { ErrorToMessage, UserExistsException } from './../../lib/utils/errors';
import {
  CreateExternalUserDto,
  CreateUserDto,
} from './../../users/models/User.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatchPasswordByHash } from '../../lib/utils/salt-hash-generate';
import { getSaltHashByPassWord } from '../../lib/utils/salt-hash-generate';
import { UsersService } from '../../users/services/users.service';
import { UserResponse } from '../models/user.response';
import { ExternalType } from 'src/users/models/SocialExternalProviders.entity';
import { PayloadModel } from '../models/payload.model';
import { toScope } from 'src/lib/utils/toscope';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(_email, pass): Promise<UserResponse> {
    const user = await this.usersService.findByEmail(_email);
    const { password, email, username } = user;
    const isMatch = await isMatchPasswordByHash(pass, password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload: PayloadModel = {
      sub: user.id,
      username,
      email,
      scope: [],
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const userResponese: UserResponse = {
      email: user.email,
      username: user.username,
      userId: user.id,
      accessToken,
    };
    return userResponese;
  }
  async signup(userDto: CreateUserDto) {
    const create = await this.usersService.create(userDto);
    return create;
  }
  async googleSignin({
    uid,
    family_name,
    given_name,
    name,
    email,
    email_verified,
    picture,
    locale,
  }): Promise<UserResponse> {
    try {
      const userProile: CreateUserDto = {
        firstName: family_name,
        lastName: given_name,
        username: name,
        email: email,
        password: null,
        isActive: email_verified,
      };
      // first login and create
      const createUser = await this.usersService.create(userProile);
      const googleUser: CreateExternalUserDto = {
        user: createUser,
        externalType: ExternalType.Google,
        username: name,
        providerId: uid,
        picture: picture,
        email: email,
        emailVerified: Boolean(email_verified),
        locale: locale,
      };
      const createExternalUser = await this.usersService.createByExternal(
        googleUser,
      );
      const success: PayloadModel = {
        sub: createExternalUser.id,
        username: createExternalUser.username,
        email,
        scope: [],
      };
      const accessToken = await this.jwtService.signAsync(success);
      const userResponese: UserResponse = {
        email: createExternalUser.email,
        username: createExternalUser.username,
        userId: createExternalUser.id,
        accessToken,
      };
      return userResponese;
    } catch (error) {
      if (error instanceof UserExistsException) {
        const user = await this.usersService.getUserAndAccessByProviderId(uid);
        this.logger.debug(user);
        const scope = toScope(user.access);
        const success: PayloadModel = {
          sub: user.id,
          username: user.username,
          email: user.email,
          scope,
        };
        const accessToken = await this.jwtService.signAsync(success);
        const userResponese: UserResponse = {
          email: user.email,
          username: user.username,
          userId: user.id,
          accessToken,
        };
        return userResponese;
      } else {
        //unknow error
        throw new HttpException(ErrorToMessage(error), HttpStatus.NOT_FOUND);
      }
    }
  }
  async checkPassword(password: string): Promise<boolean> {
    const hash = await getSaltHashByPassWord(password);
    const isMatch = await isMatchPasswordByHash(password, hash);
    return isMatch;
  }
}
