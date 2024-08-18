import { User } from './../../users/models/User.entity';
import { CreateUserDto } from './../../users/models/User.dto';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../auth.guard';
import { Public } from '../../lib/public-matedata';
import { UserResponse } from '../models/user.response';
import { SignInCommand } from '../commands/signin';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseResult } from '../../models/respone';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() signInDto: Record<string, any>,
  ): Promise<ResponseResult> {
    const result = await this.commandBus.execute(
      new SignInCommand(signInDto.email, signInDto.password),
    );
    return result;
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signupDto: CreateUserDto): Promise<User> {
    return await this.authService.signup(signupDto);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
