import { ConfigModule } from '../../config/config.module';
import { UsersModule } from '../../users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            return {
              secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
              signOptions: {
                expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
              },
            };
          },
          inject: [ConfigService],
        }),
        ConfigModule,
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be true', async () => {
    const isMatch = await service.checkPassword('12345678');
    console.log(isMatch);
    expect(isMatch).toBe(true);
  });
});
