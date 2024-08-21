import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ResponseResult } from '../../models/respone';
import { CreateUserDto } from '../../users/models/User.dto';
import { AuthService } from '../services/auth.service';

export class SignUpCommand {
  constructor(public readonly signupDto: CreateUserDto) {}
}
@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(private authService: AuthService) {}

  async execute(command: SignUpCommand): Promise<ResponseResult> {
    const signup = await this.authService.signup(command.signupDto);
    const result = new ResponseResult({
      meassge: 'Sign up is success',
      result: signup,
    });
    return result;
  }
}
