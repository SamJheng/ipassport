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
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>): Promise<UserResponse> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signup(@Body() signupDto: CreateUserDto): Promise<User> {
    return await this.authService.signup(signupDto);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
