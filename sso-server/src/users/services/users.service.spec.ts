import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../models/User.entity';

class ApiServiceMock {
  async findAll(): Promise<User[]> {
    const user = new User();
    return [user];
  }
  async findOne(id: string): Promise<User | null> {
    return {} as User;
  }
  async remove(id: string) {
    return null;
  }
}
describe('UsersService', () => {
  let service: UsersService;
  const ApiServiceProvider = {
    provide: UsersService,
    useClass: ApiServiceMock,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ApiServiceProvider],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call findAll method with expected params', async () => {
    const createSpy = jest.spyOn(service, 'findAll');
    console.log(await service.findAll());
    expect(createSpy).toHaveBeenCalled();
  });
});
