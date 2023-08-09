import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatchPasswordByHash } from '../../lib/utils/salt-hash-generate';
import { getSaltHashByPassWord } from '../../lib/utils/salt-hash-generate';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(_email, pass) {
    const user = await this.usersService.findByEmail(_email);
    const { password, email, username } = user;
    const isMatch = await isMatchPasswordByHash(pass, password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username,
      email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async checkPassword(password: string): Promise<boolean> {
    const hash = await getSaltHashByPassWord(password);
    const isMatch = await isMatchPasswordByHash(password, hash);
    return isMatch;
  }
}
