import { User } from './../../users/models/User.entity';
import { CreateUserDto, EditUserDto } from '../../users/models/User.dto';
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
import { SignInCommand } from '../commands/signin';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseResult } from '../../models/respone';
import { GetProfileCommand } from '../commands/profile';
import { SignUpCommand } from '../commands/signup';
import { AddProfileCommand } from '../commands/add-profile';
@Controller('auth')
export class AuthController {
  constructor(
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
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(
    @Body() signupDto: CreateUserDto,
  ): Promise<ResponseResult<User>> {
    const result = await this.commandBus.execute(new SignUpCommand(signupDto));
    return result;
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const id = req.user.sub;
    const result = await this.queryBus.execute(new GetProfileCommand(id));
    return result;
  }
  @UseGuards(AuthGuard)
  @Post('profile')
  async createProfile(@Request() req, @Body() editDto: EditUserDto) {
    const id = req.user.sub;
    await this.commandBus.execute(new AddProfileCommand(id, editDto));
    const res = new ResponseResult({
      message: 'update user porfile is success',
    });
    return res;
  }
}
