import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../models/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

class ApiServiceMock {
  user = new User();
  find: jest.Mock = jest.fn();
  findOneBy: jest.Mock = jest.fn();
  constructor() {
    this.find.mockReturnValue(Promise.resolve([this.user]));
    this.findOneBy.mockReturnValue(Promise.resolve(this.user));
  }
  // remove(id: string) {
  //   return jest.fn().mockReturnValue(Promise.resolve([user]));
  // }
}
describe('UsersService', () => {
  let service: UsersService;
  const mockUser = new ApiServiceMock();
  const ApiServiceProvider = {
    provide: getRepositoryToken(User),
    useValue: mockUser,
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
  it('should call findAll method with expected the user list', async () => {
    // const createSpy = jest.spyOn(service, 'findAll');
    const all = await service.findAll();
    const user = new User();
    expect(all).toEqual([user]);
  });
  it('should call findOne method with expected the user', async () => {
    // const createSpy = jest.spyOn(service, 'findAll');
    const f = await service.findOne('uuid');
    const user = new User();
    expect(f).toEqual(user);
  });
  it('should call findByEmail method with expected the user', async () => {
    // const createSpy = jest.spyOn(service, 'findAll');
    const f = await service.findByEmail('email@email.com');
    const user = new User();
    expect(f).toEqual(user);
  });
});
