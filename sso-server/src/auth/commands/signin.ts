import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../services/auth.service';
import { ResponseResult } from '../../models/respone';
export class SignInCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(private authService: AuthService) {}

  async execute(command: SignInCommand): Promise<ResponseResult> {
    const { email, password } = command;
    const login = await this.authService.signIn(email, password);
    const result = new ResponseResult({
      message: 'SignIn is success',
      result: login,
    });
    return result;
  }
}
